import ky from 'ky';

const SERVER_URL = 'http://localhost:8888/v2';
//const SERVER_URL = 'https://sandbox.2600hz.com:8443/v2';
const CREDENTIALS = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';
const ACCOUNT_ID = '4642e64040cdb8b89c310a21a07c7f62';

const SCHEMA_VMBOXES = `${SERVER_URL}/accounts/${ACCOUNT_ID}/vmboxes`;

const headers = {
    Authorization: `Basic ${CREDENTIALS}`
};

export const fetchVoicemailMessages = async (voicemailBox) => {
    const payload = await ky.get(`${SCHEMA_VMBOXES}/${voicemailBox}/messages`, { headers }).json();
    return payload;
};

export const fetchVoicemailBoxes = async () => {
    const payload = await ky.get(SCHEMA_VMBOXES, { headers }).json();
    return payload;
}

export const updateVoicemailStatus = async (voicemailBox, media_id, status) => {
    const payload = await ky.post(`${SCHEMA_VMBOXES}/${voicemailBox}/messages/${media_id}`, { 
        headers,
        json: { "folder": status  } 
    }).json();
    return payload;
}