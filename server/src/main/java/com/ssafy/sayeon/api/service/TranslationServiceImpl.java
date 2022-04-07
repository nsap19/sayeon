package com.ssafy.sayeon.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

@Service("translationService")
public class TranslationServiceImpl implements TranslationService {

	@Override
	public String translateKeywords(String keywords) {
		System.out.println("키워드 목록 : " + keywords);
		// TODO Auto-generated method stub
		String[] Keywords = keywords.replaceAll("[\\[|\\]|\\\"]", "").split(",");
		String[] result = new String[Keywords.length];

		StringBuilder sb = new StringBuilder();
		HashSet<String> set = new HashSet<>();
		for (int i = 0; i < Keywords.length; i++) {
			if (Keywords[i].toLowerCase().equals("outdoor")) {
				set.add("야외");
			} else {

				String word = translate(Keywords[i] + ",").replaceAll("[,.]", "");
				System.out.println(word);
				set.add(word);
			}
		}

		for (String str : set) {
			sb.append(str + ",");
		}

		return sb.toString().substring(0, sb.length() - 1);
	}

	private static String translate(String originalText) {

		String clientId = "08gQdgEQNrUDXlwu9C5Q";// 애플리케이션 클라이언트 아이디값";
		String clientSecret = "wStp_il6u5";// 애플리케이션 클라이언트 시크릿값";

		String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
		String text;
		try {
			text = URLEncoder.encode(originalText, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("인코딩 실패", e);
		}

		Map<String, String> requestHeaders = new HashMap<>();

		requestHeaders.put("X-Naver-Client-Id", clientId);
		requestHeaders.put("X-Naver-Client-Secret", clientSecret);

		String responseBody = post(apiURL, requestHeaders, text);

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(responseBody);
		JsonElement objMessage = element.getAsJsonObject().get("message");
		JsonElement objResult = objMessage.getAsJsonObject().get("result");

		String translatedText = objResult.getAsJsonObject().get("translatedText").getAsString();

		System.out.println(translatedText);
		return translatedText;
	}

	private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
		HttpURLConnection con = connect(apiUrl);
		String postParams = "source=en&target=ko&text=" + text; // 원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
		try {
			con.setRequestMethod("POST");
			for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
				con.setRequestProperty(header.getKey(), header.getValue());
			}
			con.setDoOutput(true);
			try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
				wr.write(postParams.getBytes());
				wr.flush();
			}
			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
				return readBody(con.getInputStream());
			} else { // 에러 응답
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	private static HttpURLConnection connect(String apiUrl) {
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection) url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	private static String readBody(InputStream body) {
		InputStreamReader streamReader = new InputStreamReader(body);
		try (BufferedReader lineReader = new BufferedReader(streamReader)) {
			StringBuilder responseBody = new StringBuilder();
			String line;
			while ((line = lineReader.readLine()) != null) {
				responseBody.append(line);
			}
			return responseBody.toString();
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
		}
	}

}
