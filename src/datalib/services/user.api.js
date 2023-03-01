import getApiUri from '../api.util';
import SecuredBaseApi from '../securedBase.api';
/*
 * Here we handled user related API's
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
class AuthenticationApi extends SecuredBaseApi {
  /*
   * This function is used to geneate email otp for email verification
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async generateEmailOtp(email) {
    const response = await this.securedAxios.post(
      getApiUri('/auth/generate-otp'),
      {
        email,
      },
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to update user information
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async updateUser(data) {
    const response = await this.securedAxios.put(
      getApiUri('/user/update-profile'),
      data,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to verify email otp
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async verifyEmailOTP(email, otp) {
    const response = await this.securedAxios.post(
      getApiUri('/auth/verify-email'),
      {email, otp},
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to fetch user profile
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getUserById() {
    const response = await this.securedAxios.get(
      getApiUri('/user/get-user-profile'),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to upload image
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async uploadProfilePic(file) {
    const response = await this.securedAxios.post(
      getApiUri('/utility/upload-file'),
      file,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to getUserReviews
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getUserReviews(filter) {
    const response = await this.securedAxios.get(
      getApiUri(`/user/review/get/${filter.userId}`),
    );

    return Promise.resolve(response.data);
  }
  /*
   * This function is used create UserFeedback
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async createUserFeedback(feedback) {
    const response = await this.securedAxios.post(
      getApiUri('/user/review/create'),
      feedback,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to delete Account
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async deleteAccount() {
    const response = await this.securedAxios.delete(getApiUri('/user/delete'));
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to  add a Card
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async addCard(card) {
    const response = await this.securedAxios.post(getApiUri('/card/add'), card);
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to get cards of an user
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getCards() {
    const response = await this.securedAxios.get(getApiUri('/card/get'));
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to update Card
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async updateCard(card, cardId) {
    const response = await this.securedAxios.put(
      getApiUri(`/card/update/${cardId}`),
      card,
    );
    return Promise.resolve(response.data);
  }

  /*
   * This function is used to setDefaultCard
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async setDefaultCard(cardId) {
    const response = await this.securedAxios.put(
      getApiUri(`/card/set-default/${cardId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to deleteCard
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async deleteCard(cardId) {
    const response = await this.securedAxios.delete(
      getApiUri(`/card/delete/${cardId}`),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to getDefaultCrad
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getDefaultCard() {
    const response = await this.securedAxios.get(
      getApiUri('/card/get/default'),
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to create App Feedback
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async appFeedback(feedback) {
    const response = await this.securedAxios.post(
      getApiUri('/feedback'),
      feedback,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to get Common Help Questions
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getFaq() {
    const response = await this.securedAxios.get(getApiUri('/common/get-faqs'));
    return Promise.resolve(response.data);
  }
}

export default AuthenticationApi;
