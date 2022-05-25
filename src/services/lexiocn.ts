import apis from '@/utils/apis';
import request from '@/utils/request';

export const lexiocnService = {
  async getLexiconList() {
    const lexiconList = await request(apis.getLexiconList);
    return lexiconList;
  },
};

export default lexiocnService;
