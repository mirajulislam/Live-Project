package com.example.JobScraperJavaEight;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.jsoup.Jsoup;

import java.util.ArrayList;
import java.util.List;

public class ApiExample {
    private static OkHttpClient client;

    public static void main(String[] args) {
        getScrapedJobs();
    }

    public static void getScrapedJobs() {
        try {
            int totalJob = 0;
            int start = 0;
            String pagination = "";

            do {
                List<Job> jobList = new ArrayList<Job>();
                pagination = "https://jobs.roblox.com/api/apply/v2/jobs?domain=roblox.com&start=" + start
                        + "&num=10&domain=roblox.com";
//				log.info(pagination);
                JsonNode mJsonNode = getJsonObject(pagination);
                if (mJsonNode.get("positions").size() > 0) {
                    totalJob = mJsonNode.get("count").asInt();

                    JsonNode jsonNode = mJsonNode.get("positions");

                    for (JsonNode jobDetails : jsonNode) {
                        Job job = new Job();
                        String id = jobDetails.get("id").asText();
                        job.setUrl("https://jobs.roblox.com/careers?pid=" + id + "&domain=roblox.com");
                        job.setTitle(jobDetails.get("name").asText());
                        job.setName(jobDetails.get("name").asText());
                        job.setLocation(jobDetails.get("location").asText());
                        job.setCategory(jobDetails.get("department").asText());
                        job.setReferenceId(jobDetails.get("display_job_id").asText());
                        jobList.add(job);
                    }

                    for (Job job : jobList) {
                        try {
                            System.out.println(getJobDetails(job));
                        } catch (Exception e) {
//                            log.warn("Failed to parse details of: [{}]", e.getMessage());
                        }
                    }
                    start += 10;
                } else {
                    break;
                }
            } while (true);

        } catch (Exception e) {
//            log.warn("Failed to parse details of: [{}]", e.getMessage());
        } finally {
            client.dispatcher().executorService().shutdown();
            client.connectionPool().evictAll();
        }
    }

    private static Job getJobDetails(Job job) {
        String id = job.getUrl().split("=")[1].split("&")[0].trim();
        String jobApiUrl = "https://jobs.roblox.com/api/apply/v2/jobs/" + id + "?domain=roblox.com";

        JsonNode jobDetails = getIndividualJob(jobApiUrl);
        if (jobDetails != null) {
            String jobDesc = jobDetails.get("job_description").asText();
            String parsedDesc = Jsoup.parse(jobDesc).text();
//			job.setApplicationUrl(jobDetails.get("apply_redirect_url").asText());
            job.setSpec(parsedDesc);
        }
        return job;
    }

    public static JsonNode getJsonObject(String siteurl) throws InterruptedException {
        JsonNode jsonNode = null;
        Request request = new Request.Builder().url(siteurl).method("GET", null)
                .addHeader("Content-Type", "application/json").addHeader("Accept", "application/json").build();
        client = new OkHttpClient().newBuilder().build();
        try {
            Response response = client.newCall(request).execute();
            ObjectMapper objectMapper = new ObjectMapper();
            jsonNode = objectMapper.readTree(response.body().string());
            response.close();
        } catch (Exception e) {
            try {
                client.dispatcher().executorService().shutdown();
                client.connectionPool().evictAll();
//                log.info("Waiting for 5 minute to get job and skip human varification");
                Thread.sleep(500000);
                client = new OkHttpClient().newBuilder().build();
                Response response = client.newCall(request).execute();
                ObjectMapper objectMapper = new ObjectMapper();
                jsonNode = objectMapper.readTree(response.body().string());
                response.close();
            } catch (Exception e1) {
//				log.info("After waiting for one minute exception for job in one page occurs again");
            }
        }
        return jsonNode;
    }

    private static JsonNode getIndividualJob(String jobUrl) {
        JsonNode jsonNode = null;
        Request request = new Request.Builder().url(jobUrl).method("GET", null)
                .addHeader("Content-Type", "application/json").addHeader("Accept", "application/json").build();
        try {
            Response response = client.newCall(request).execute();
            ObjectMapper objectMapper = new ObjectMapper();
            jsonNode = objectMapper.readTree(response.body().string());
            response.close();
        } catch (Exception e) {
            try {
                client.dispatcher().executorService().shutdown();
                client.connectionPool().evictAll();
//                log.info("Waiting for 5 minute to get job and skip human varification");
                Thread.sleep(500000);
                client = new OkHttpClient().newBuilder().build();
                Response response = client.newCall(request).execute();
                ObjectMapper objectMapper = new ObjectMapper();
                jsonNode = objectMapper.readTree(response.body().string());
                response.close();
            } catch (Exception e1) {
//				log.info("After waiting for one minute exception for individual job occurs again");
            }
        }
        return jsonNode;
    }
}
