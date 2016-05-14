import superagent from 'superagent';
import Promise from 'bluebird';
import promisifySuperagent from 'superagent-promise';

export default promisifySuperagent(superagent, Promise);
