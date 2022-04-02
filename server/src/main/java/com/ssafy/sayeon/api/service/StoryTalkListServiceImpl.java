package com.ssafy.sayeon.api.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.response.ReceivedStoryRes;
import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.ReceivedStoryView;
import com.ssafy.sayeon.model.entity.Request;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;
import com.ssafy.sayeon.model.repository.RequestRepository;
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
	@Autowired
	RequestRepository requestRepository;

	@Override
	public List<ReceivedStory> getReceivedStoryList(Member receiver) {
		// TODO Auto-generated method stub
		return receivedStroryRepository.findAllByReceiver(receiver);
	}

	@Override
	public List<SentStory> getSentStoryList(Member sender) {
		// TODO Auto-generated method stub
		return sentStroryRepository.findAllBySender(sender);
	}

	@Override
	public List<StoryTalkBody> getStoryTalkList(Member member) {
		// TODO Auto-generated method stub
		List<StoryTalkBody> storyTalkList = new ArrayList<>(); // 하나의 StoryTalkBody : 한 사용자와 나눈 대화 목록

		final int SIZE = 3;

		// 받는 사람이 현재 로그인한 유저인 경우
		List<ReceivedStory> receivedStoryList = receivedStroryRepository.findAllByReceiver(member);// 내가 받은 사연 모두 조회

		// Key는 대화 목록의 다른 사람의 아이디
		HashMap<String, List<ReceivedStoryRes>> map = new HashMap<String, List<ReceivedStoryRes>>();

		for (int i = 0; i < receivedStoryList.size(); i++) {
			String storyId = receivedStoryList.get(i).getStoryId();
			SentStory sent = sentStroryRepository.findByStoryId(storyId);
			Member sender = sent.getSender();
			String senderId = sender.getUserId();
			String senderNickname = sender.getMemberProfile().getNickname();
			// userId기준으로 받은 목록을 조회해 온거라 receiverId == userId
//			String receiverId = receivedStoryList.get(i).getReceiverId();
			String receiverNickname = member.getMemberProfile().getNickname();
			String dateSent = sent.getDateSent();
			String dateReceived = receivedStoryList.get(i).getDateReceived();
			String image = sent.getImage();
			String imageType = sent.getImageType().name();
			if (map.containsKey(senderId)) {
				map.get(senderId).add(new ReceivedStoryRes(storyId, senderId,senderNickname, member.getUserId(),receiverNickname, dateSent,
						dateReceived, image, imageType));
			} else {
				List<ReceivedStoryRes> list = new ArrayList<ReceivedStoryRes>();
				list.add(new ReceivedStoryRes(storyId, senderId,senderNickname, member.getUserId(),receiverNickname, dateSent, dateReceived, image,
						imageType));
				map.put(senderId, list);
			}

		}

		// 보낸 사람이 현재 로그인한 유저인 경우
		List<SentStory> sentStoryList = sentStroryRepository.findAllBySender(member); // 내가 보낸 사연 모두 조회

		for (SentStory story : sentStoryList) {
			Optional<ReceivedStory> rs = receivedStroryRepository.findByStoryId(story.getStoryId());
			if (rs.isPresent()) {
				String storyId = story.getStoryId();
				String senderNickname = member.getMemberProfile().getNickname();
				Member receiver = rs.get().getReceiver();
				String receiverId = receiver.getUserId();
				String receiverNickname = receiver.getMemberProfile().getNickname();
				String dateSent = story.getDateSent();
				String dateReceived = rs.get().getDateReceived();
				String image = story.getImage();
				String imageType = story.getImageType().name();

				if (map.containsKey(receiverId)) {
					map.get(receiverId).add(new ReceivedStoryRes(storyId, member.getUserId(),senderNickname, receiverId,receiverNickname, dateSent,
							dateReceived, image, imageType));
				} else {
					List<ReceivedStoryRes> list = new ArrayList<ReceivedStoryRes>();
					list.add(new ReceivedStoryRes(storyId, member.getUserId(),senderNickname, receiverId,receiverNickname, dateSent, dateReceived,
							image, imageType));
					map.put(receiverId, list);
				}
			}
		}

		List<Request> r = requestRepository.findAllByUserId(member);
		List<String> removeList = new ArrayList<String>();
		for (String key : map.keySet()) {
			for (int i = 0; i < r.size(); i++) {
				if (r.get(i).getRequestedId().getUserId().equals(key)) {
					removeList.add(key);
				}
			}
		}

		for (String id : removeList) {
			map.remove(id);
		}

		for (String key : map.keySet()) {
			List<ReceivedStoryRes> list = map.get(key);
			// 날짜순 정렬
			Collections.sort(list, new Comparator<ReceivedStoryRes>() {
				@Override
				public int compare(ReceivedStoryRes o1, ReceivedStoryRes o2) {
					return (int) (Long.parseLong(o2.getDateReceived().replaceAll("[ :-]", ""))
							- Long.parseLong(o1.getDateReceived().replaceAll("[ :-]", "")));
				}
			});

			// SIZE 개수만큼 자르기
			List<ReceivedStoryRes> limitedlist = new ArrayList<>();
			int s = list.size() < SIZE ? list.size() : SIZE;
			for (int i = 0; i < s; i++) {
				limitedlist.add(list.get(i));
			}
			if (limitedlist.size() > 0) {
				StoryTalkBody stb = new StoryTalkBody(limitedlist);
				storyTalkList.add(stb);
			}
		}

		Collections.sort(storyTalkList, new Comparator<StoryTalkBody>() {

			@Override
			public int compare(StoryTalkBody o1, StoryTalkBody o2) {
				// TODO Auto-generated method stub
				return (int) (Long.parseLong( o2.getStoryTalk().get(0).getDateReceived().replaceAll("[ :-]", "")) - 
						Long.parseLong( o1.getStoryTalk().get(0).getDateReceived().replaceAll("[ :-]", "")));
			}

		});

		return storyTalkList;
	}

	@Override
	public List<ReceivedStoryView> getConversationList(Member me, String friendId) {
		List<ReceivedStoryView> list = sentStroryRepository.findAllWithConditions(me.getUserId(), friendId);
		return list;
	}

}
