import {WebSocket} from 'uWebSockets.js';
import {IUserToken} from '../../../shared-models';

export interface IWebSocketSchema extends WebSocket{
    user?: IUserToken;
    user_id?: number;
    id?: string;
    url?:string
}
