import ky from 'ky';

const SERVER_URL = 'http://localhost:8888/v2';
//const SERVER_URL = 'https://sandbox.2600hz.com:8443/v2';
const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';
const ACCOUNT_ID = '4642e64040cdb8b89c310a21a07c7f62';
const DEFAULT_VMBOX_ID = 'b37675a2d7b90d60f0ee5d4175502394';
const SCHEMA_VMBOXES = `${SERVER_URL}/accounts/${ACCOUNT_ID}/vmboxes`;

const headers = {
    Authorization: `Basic ${credentials}`
};

const fetchVoicemailMessages = async (voicemailBox = DEFAULT_VMBOX_ID) => {
    try {
        const payload = await ky.get(`${SCHEMA_VMBOXES}/${voicemailBox}/messages`, { headers }).json();
        return payload;
    } catch(ex) {
        console.log(ex);
    }
};

const fetchVoicemailBoxes = async () => {
    try {
        const response = await ky.get(SCHEMA_VMBOXES, { headers });
        if(response.headers.get('content-type') === 'application/json') {
            return JSON.parse(response.body);
        }
    } catch(ex) {
        console.log(ex);
    }
}

const updateVoicemailStatus = async (data) => {
    try {
        const response = await ky.get(``, { headers });
        if(response.headers.get('content-type') === 'application/json') {
            return JSON.parse(response.body);
        }
    } catch(ex) {
        console.log(ex);
    }
}

export default { fetchVoicemailMessages, fetchVoicemailBoxes, updateVoicemailStatus };