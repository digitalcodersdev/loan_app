import getApiUri from '../api.util';
import SecuredBaseApi from '../securedBase.api';
/*
 * Here we handle all Chat Api's
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
class ChatApi extends SecuredBaseApi {
  /*
   * This function is used to create a chat room
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async createChatRoom(id) {
    const response = await this.securedAxios.post(
      getApiUri(`/messaging/chat-room/create/${id}`),
    );
    return Promise.resolve(response.data);
  }
}

export default ChatApi;
