package com.ssafy.sayeon.api.service;

import java.awt.print.Pageable;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.response.ReceivedStoryInfo;
import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.api.response.StoryTalkListResponseBody;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;
import com.ssafy.sayeon.model.repository.SentStroryRepository;

@Service("sayeonTalkListService")
public class StoryTalkListServiceImpl implements StoryTalkListService {

	@Autowired
	MemberProfileRepository memberProfileRepository;
	@Autowired
	ReceivedStroryRepository receivedStroryRepository;
	@Autowired
	SentStroryRepository sentStroryRepository;
	@Autowired
	MemberRepository memberRepository;

	@Override
	public List<ReceivedStory> getReceivedStoryList(String receiverId) {
		// TODO Auto-generated method stub
		return receivedStroryRepository.findAllByReceiverId(receiverId);
	}

	@Override
	public List<SentStory> getSentStoryList(String senderId) {
		// TODO Auto-generated method stub
		return sentStroryRepository.findAllBySenderId(senderId);
	}

	@Override
	public List<StoryTalkBody> getStoryTalkList(String userId) {
		// TODO Auto-generated method stub
		List<StoryTalkBody> storyTalkList = new ArrayList<>(); // 하나의 StoryTalkBody : 한 사용자와 나눈 대화 목록

		final int SIZE = 3;

		// 받는 사람이 현재 로그인한 유저인 경우
		List<ReceivedStory> receivedStoryList = receivedStroryRepository.findAllByReceiverId(userId);// 내가 받은 사연 모두 조회

		//Key는 대화 목록의 다른 사람의 아이디
		HashMap<String, List<ReceivedStoryInfo>> map = new HashMap<String, List<ReceivedStoryInfo>>();
		
		for (int i = 0; i < receivedStoryList.size(); i++) {
			String storyId = receivedStoryList.get(i).getStoryId();
			SentStory sent = sentStroryRepository.findByStoryId(storyId);
			String senderId = sent.getSenderId();
			// userId기준으로 받은 목록을 조회해 온거라 receiverId == userId
//			String receiverId = receivedStoryList.get(i).getReceiverId();
			String dateSent = sent.getDateSent();
			String dateReceived = receivedStoryList.get(i).getDateReceived();
			String image = sent.getImage();
			int waitingId = sent.getWaitingId();
			String imageType = sent.getImageType();
			if (map.containsKey(senderId)) {
				map.get(senderId).add(new ReceivedStoryInfo(storyId, senderId, userId, dateSent, dateReceived, image,
						waitingId, imageType));
			} else {
				List<ReceivedStoryInfo> list = new ArrayList<ReceivedStoryInfo>();
				list.add(new ReceivedStoryInfo(storyId, senderId, userId, dateSent, dateReceived, image, waitingId,
						imageType));
				map.put(senderId, list);
			}

		}

		// 보낸 사람이 현재 로그인한 유저인 경우
		List<SentStory> sentStoryList = sentStroryRepository.findAllBySenderId(userId); // 내가 보낸 사연 모두 조회

		for (SentStory story : sentStoryList) {
			Optional<ReceivedStory> rs = receivedStroryRepository.findByStoryId(story.getStoryId());
			if (rs.isPresent()) {
				String storyId = story.getStoryId();
				String receiverId = rs.get().getReceiverId();
				String dateSent = story.getDateSent();
				String dateReceived = rs.get().getDateReceived();
				String image = story.getImage();
				int waitingId = story.getWaitingId();
				String imageType = story.getImageType();

				if (map.containsKey(receiverId)) {
					map.get(receiverId).add(new ReceivedStoryInfo(storyId, userId, receiverId, dateSent, dateReceived,
							image, waitingId, imageType));
				} else {
					List<ReceivedStoryInfo> list = new ArrayList<ReceivedStoryInfo>();
					list.add(new ReceivedStoryInfo(storyId, userId, receiverId, dateSent, dateReceived, image,
							waitingId, imageType));
					map.put(receiverId, list);
				}
			}
		}

		
		for (String key : map.keySet()) {
			List<ReceivedStoryInfo> list = map.get(key);
			// 날짜순 정렬
			Collections.sort(list, new Comparator<ReceivedStoryInfo>() {
				@Override
				public int compare(ReceivedStoryInfo o1, ReceivedStoryInfo o2) {
					return (int) (Long.parseLong(o2.getDateReceived().replaceAll("[ :-]", ""))
							- Long.parseLong(o1.getDateReceived().replaceAll("[ :-]", "")));
				}
			});

			// SIZE 개수만큼 자르기
			List<ReceivedStoryInfo> limitedlist = new ArrayList<>();
			int s = list.size() < SIZE ? list.size() : SIZE;
			for (int i = 0; i < s; i++) {
				limitedlist.add(list.get(i));
			}

			StoryTalkBody stb = new StoryTalkBody(limitedlist);
			storyTalkList.add(stb);
		}

		return storyTalkList;
	}

}
