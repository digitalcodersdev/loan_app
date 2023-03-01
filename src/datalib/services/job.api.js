import getApiUri from '../api.util';
import SecuredBaseApi from '../securedBase.api';
/*
 * Here we handle all job related Api's
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
class JobApi extends SecuredBaseApi {
  /*
   * This function is used to post a new job
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async createJob({job, skill}) {
    const response = await this.securedAxios.post(
      getApiUri('/job/create'),
      job,
    );
    console.log(response);
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to update a job
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async updateJob(job, jobId) {
    const response = await this.securedAxios.put(
      getApiUri(`/job/update/${jobId}`),
      job,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to fetch all jobs posted by an user
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getMyJobs(userId) {
    const response = await this.securedAxios.get(
      getApiUri(`/job/get/${userId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to fetch curre job of an user
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getCurrentJob() {
    const response = await this.securedAxios.get(
      getApiUri('/job/get-current-job'),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to cancel a job
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async cancelJob(jobId) {
    const response = await this.securedAxios.put(
      getApiUri(`/job/cancel/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to cancel a job
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async completeJob(jobId) {
    const response = await this.securedAxios.put(
      getApiUri(`/job/cancel/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to delete a job
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async deleteJob(jobId) {
    const response = await this.securedAxios.delete(
      getApiUri(`/job/delete/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to fetch all common skills
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getSkills() {
    const response = await this.securedAxios.get(
      getApiUri('/common/get-skill'),
    );
    return Promise.resolve(response.data);
  }

  /*
   * This function is used to fetch job applicant
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getJobApplicant(jobId) {
    const response = await this.securedAxios.get(
      getApiUri(`/job/get/applicant/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to create Job Report
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async jobReport(report) {
    const response = await this.securedAxios.post(
      getApiUri('/job/report'),
      report,
    );
    return Promise.resolve(response.data);
  }

    /*
   * This function is used to craete updatePayment
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async updatePayment(jobId) {
    const response = await this.securedAxios.put(
      getApiUri(`/payment/update/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to confirm Payemnt
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async confirmPayment(jobId) {
    const response = await this.securedAxios.put(
      getApiUri(`/payment/confirm/${jobId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to markJobDispute
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async markJobDispute(dispute) {
    const {jobId, disputeCode} = dispute;
    const response = await this.securedAxios.put(
      getApiUri(`/job/mark-dispute/${jobId}`),
      {disputeCode},
    );
    return Promise.resolve(response.data);
  }
}

export default JobApi;
