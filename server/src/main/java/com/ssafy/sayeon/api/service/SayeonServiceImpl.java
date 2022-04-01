package com.ssafy.sayeon.api.service;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.common.exception.NotExistUserException;
import com.ssafy.sayeon.common.exception.NotExistWaitingTimeException;
import com.ssafy.sayeon.common.util.ImageUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SelectedKeyword;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.entity.SentStory.ImageType;
import com.ssafy.sayeon.model.entity.WaitingTime;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;
import com.ssafy.sayeon.model.repository.SayeonRepository;
import com.ssafy.sayeon.model.repository.SelectedKeywordRepository;
import com.ssafy.sayeon.model.repository.SentStroryRepository;
import com.ssafy.sayeon.model.repository.WaitingTimeRepository;

@Service
public class SayeonServiceImpl implements SayeonService {

	@Autowired
	ImageUtil imageUtil;

	@Autowired
	SayeonRepository sayeonRepository;

	@Autowired
	WaitingTimeRepository waitingTimeRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	SelectedKeywordRepository selectedKeywordRepository;

	@Autowired
	ReceivedStroryRepository receivedStoryRepository;

	@Autowired
	SentStroryRepository sentStoryRepository;

	static final double MINIMUM = 0.7;

	@Override
	@Transactional
	public SentStory saveStory(Member member, SayeonReq sayeon) {
		SentStory story = new SentStory();
		story.setSender(member);
		story.setDateSent(LocalDateTime.now().toString());
		story.setImage(sayeon.getImageUrl());
		story.setImageType(ImageType.valueOf(sayeon.getImageType().toUpperCase()));
		if (sayeon.getWaitingId() != 0 || waitingTimeRepository.existsById(sayeon.getWaitingId())) {
			WaitingTime wt = waitingTimeRepository.findById(sayeon.getWaitingId())
					.orElseThrow(() -> new NotExistWaitingTimeException());
			story.setWatingId(wt);
		}

		story = sayeonRepository.save(story);

		// 수신자 지정 있을 시 receivedStory 저장
		if (!sayeon.getReceiverId().equals("null")) {
			Member receiver = memberRepository.findById(sayeon.getReceiverId())
					.orElseThrow(() -> new NotExistUserException());
			ReceivedStory rc = new ReceivedStory(story, story.getStoryId(), receiver, LocalDateTime.now().toString());
			receivedStoryRepository.save(rc);
		}

		// 선택한 키워드 저장
		Gson gson = new Gson();
		String[] arr = sayeon.getKeyword().replaceAll(" ", "").toLowerCase().split(",");
		Set<String> keywords = new HashSet<String>(Arrays.asList(arr));

		String str = gson.toJson(keywords);
		SelectedKeyword sk = new SelectedKeyword(story, str);
		selectedKeywordRepository.save(sk);

		System.out.println(str);

		return story;
	}

	@Override
	public List<WaitingTime> getWaitingTime() {
		return waitingTimeRepository.findAll();
	}

	@Override
	public void storyMatching(SentStory story) {
		// 내 키워드
		String myKeywordStr = selectedKeywordRepository.getById(story.getStoryId()).getKeyword();
		String[] myKeywords = myKeywordStr.replaceAll("[\\[|\\]|\\\"]", "").split(",");

		List<SelectedKeyword> keywordList = selectedKeywordRepository
				.findAllKeywordWithNotMachingUser(story.getStoryId());

		double maxSimilarity = 0;
		String maxStoryId = "";

		Gson gson = new Gson();
		for (SelectedKeyword sk : keywordList) {

			Type setType = new TypeToken<HashSet<String>>() {
			}.getType();
			Set<String> keywords = gson.fromJson(sk.getKeyword(), setType); // json -> set

			System.out.println(sk.getStoryId() + " " + keywords);

//
			int count = 0;

			for (String s : keywords) {
				System.out.println(s);
			}
			for (int i = 0; i < myKeywords.length; i++) {
				if (keywords.contains(myKeywords[i])) {
					count++;
				}
			}

			double similarity = count / ((double)(keywords.size() + myKeywords.length) - count);
			System.out.println("유사도 : " + similarity);

			if (maxSimilarity < similarity) {
				maxSimilarity = similarity;
				maxStoryId = sk.getStoryId();
			}
		}

		// 기준 이상 유사도 나타나면 매칭
		if (maxSimilarity > MINIMUM) {

			SentStory matchedStory = sentStoryRepository.findByStoryId(maxStoryId);

			// 날짜 계산 : 기존의 sentdate + waitingid.waitingtime * 거리 기준 계산 ??

			// 매칭되면 receivedStory에 내 스토리 저장
			ReceivedStory mine = new ReceivedStory(story, story.getStoryId(), matchedStory.getSender(), LocalDateTime.now().toString());
			receivedStoryRepository.save(mine);

			// 상대방 스토리도 저장
			ReceivedStory yours = new ReceivedStory(matchedStory, matchedStory.getStoryId(), story.getSender(),
					LocalDateTime.now().toString());
			receivedStoryRepository.save(yours);
		}

	}

	 /**
	 * 두 지점간의 거리 계산
	 * 
	 * @param lat1 지점 1 위도
	 * @param lon1 지점 1 경도
	 * @param lat2 지점 2 위도
	 * @param lon2 지점 2 경도
	 * @param unit 거리 표출단위
	 * @return
	 */
	
	private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {

		double theta = lon1 - lon2;
		double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))
				+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515;

		if (unit == "kilometer") {
			dist = dist * 1.609344;
		} else if (unit == "meter") {
			dist = dist * 1609.344;
		}

		return (dist);
	}

	// This function converts decimal degrees to radians
	private static double deg2rad(double deg) {
		return (deg * Math.PI / 180.0);
	}

	// This function converts radians to decimal degrees
	private static double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}

	private static String getTime(String sentdate, double distance, int waitingtime) throws ParseException {

		// 2022-03-31 14:58:23
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date = format.parse(sentdate);

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

		int distToSecond = (int) (distance / 100 * 600);

		int waitSecond = distToSecond * waitingtime;
		cal.add(Calendar.SECOND, waitSecond);
		
		String receivedDate = format.format(cal.getTime());
		
		System.out.println(sentdate);
		System.out.println(receivedDate);

		// 100km당 한시간
		return receivedDate;
	}


}
