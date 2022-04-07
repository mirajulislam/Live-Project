package com.example.JobScraperJavaEight;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Job {
    private static final long serialVersionUID = 4985007255179745214L;

    private Long jobId;

    private Long jobVer;

    /** Job site configuration foreign key */
    private long siteMetaKey;

    /** Job reference as stated at external site */
    private String referenceId;

    /** Permanent URL of the posted job, used to check uniqueness of the job */
    private String url;

    /** Job posting is still active or not */
    private String name;

    /** Job location; e.g. Dhaka, BD, Houston, Texas */
    private String location;

    /** Job title */
    private String title;

    /** Job description or specification */
    private String spec;

    /** Job requirements and qualifications needed */
    private String prerequisite;

    /** Job type; e.g. full time, part time etc. */
    private String type;

    /** Job category; e.g. sales, analyst etc. */
    private String category;

    /** Comment on the job details or any other thing */
    private String comment;

    private LocalDate postedDate;

    /** URL to apply for the job */
    private String applicationUrl;

    /** Email address to apply for the job */
    private String applyEmail;

    private String orgShortName;

    private LocalDateTime addedDate;

    private LocalDateTime lastUpdated;

    private Integer userModId;

    /** job record is active or not (archived) */
    private Boolean active;

    /** To track job process with Tag occurrence */
    private Short tagCount;

    private String status;

    private int runEventKey;

    private Boolean locationTagged;

    /** When the job was dateline at site */
    private LocalDate deadline;

    private String orgAssociate;

    private Integer orgAggregateKey;

    public void setLocationTagged(Boolean locationTagged) {
        this.locationTagged = locationTagged;
    }

    public Boolean isLocationTagged() {
        return locationTagged;
    }

    public Job(String jobDetailsUrl) {
        this.url = jobDetailsUrl;
    }

    public Job() {
    }

    /**
     * Returns whether job record is archived (soft delete) or not.
     *
     * @return <code>true</code> if job is archived and <code>false</code> otherwise
     */
    public boolean isArchived() {
        return active == null || active == false;
    }

    public boolean isActive() {
        return active != null && active == true;
    }


    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public Long getJobVer() {
        return jobVer;
    }

    public void setJobVer(Long jobVer) {
        this.jobVer = jobVer;
    }

    public long getSiteMetaKey() {
        return siteMetaKey;
    }

    public void setSiteMetaKey(long siteMetaKey) {
        this.siteMetaKey = siteMetaKey;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(String prerequisite) {
        this.prerequisite = prerequisite;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public String getApplicationUrl() {
        return applicationUrl;
    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public String getApplyEmail() {
        return applyEmail;
    }

    public void setApplyEmail(String applyEmail) {
        this.applyEmail = applyEmail;
    }

    public String getOrgShortName() {
        return orgShortName;
    }

    public void setOrgShortName(String orgShortName) {
        this.orgShortName = orgShortName;
    }

    public Integer getUserModId() {
        return userModId;
    }

    public void setUserModId(Integer userModId) {
        this.userModId = userModId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Short getTagCount() {
        return tagCount;
    }

    public void setTagCount(Short tagCount) {
        this.tagCount = tagCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRunEventKey() {
        return runEventKey;
    }

    public void setRunEventKey(int runEventKey) {
        this.runEventKey = runEventKey;
    }

    public LocalDateTime getAddedDate() {
        return addedDate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public void setOrgAssociate(String orgAssociate) {
        this.orgAssociate = orgAssociate;
    }

    public String getOrgAssociate() {
        return orgAssociate;
    }

    public void setOrgAggregateKey(Integer orgAggregateKey) {
        this.orgAggregateKey = orgAggregateKey;
    }

    public Integer getOrgAggregateKey() {
        return orgAggregateKey;
    }



    public boolean equals(Job ob) {
        return this.getJobId() == ob.getJobId() && this.getTitle().equals(ob.getTitle())
                && this.getName().equals(ob.getName()) && this.getLocation().equals(ob.getLocation())
                && this.getUrl().equals(ob.getUrl()) && this.getCategory().equals(ob.getCategory())
                && this.getType().equals(ob.getType()) && this.getSpec().equals(ob.getSpec())
                && this.getApplicationUrl().equals(ob.getApplicationUrl())
                && this.getApplyEmail().equals(ob.getApplyEmail())
                && this.getOrgShortName().equals(ob.getOrgShortName())
                && this.getReferenceId().equals(ob.getReferenceId())
                && this.getPrerequisite().equals(ob.getPrerequisite());
    }
    @Override
    public String toString() {
        return "Job [jobId=" + jobId + ", jobVer=" + jobVer + ", siteMetaKey=" + siteMetaKey + ", referenceId="
                + referenceId + ", url=" + url + ", name=" + name + ", location=" + location + ", title=" + title
                + ", spec=" + spec + ", prerequisite=" + prerequisite + ", type=" + type + ", category=" + category
                + ", comment=" + comment + ", postedDate=" + postedDate + ", applicationUrl=" + applicationUrl
                + ", applyEmail=" + applyEmail + ", orgShortName=" + orgShortName + ", addedDate=" + addedDate
                + ", lastUpdated=" + lastUpdated + ", userModId=" + userModId + ", active=" + active + ", tagCount="
                + tagCount + ", status=" + status + ", runEventKey=" + runEventKey + ", locationTagged="
                + locationTagged + ", deadline=" + deadline + ", orgAssociate=" + orgAssociate + ", orgAggregateKey="
                + orgAggregateKey + "]";
    }

}

