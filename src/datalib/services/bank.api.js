import getApiUri from '../api.util';
import SecuredBaseApi from '../securedBase.api';
/*
 * Here we handle user bank related Api's
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
class BankApi extends SecuredBaseApi {
  /*
   * This function is used to add an user bank
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async addBank(data) {
    const response = await this.securedAxios.post(
      getApiUri('/user/add-bank'),
      data,
    );
    return Promise.resolve(response.data);
  }
  /*
   * This function is used to fetch all bank account of an user
   * @author Kindajobs <jdeveloper.vimal@gmail.com>
   */
  async getBankAccount(data) {
    const response = await this.securedAxios.get(
      getApiUri('/user/get-bank-accounts'),
    );
    return Promise.resolve(response.data);
  }
}

export default BankApi;
