const BASE_URL = process.env.BASE_URL;
const token = process.env.PRAYER_TOKEN;


const API_URL = {
    get: async (url, authRequired = true) => {
        try {
            let headers = {
                'Content-Type': 'application/json', // Initialize with default value
            };

            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? token : ''}`,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'GET',
                headers: Object.fromEntries(Object.entries(headers)),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    post: async (url, body, authRequired = true) => {
        try {
            let headers = {
                'Content-Type': 'application/json', // Initialize with default value
            };
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? token : ''}`,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'POST',
                headers: Object.fromEntries(Object.entries(headers)),

                body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    put: async (url, body, authRequired = true) => {
        try {
            let headers = {
                'Content-Type': 'application/json', // Initialize with default value
            };
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? token : ''}`,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'PUT',
                headers: Object.fromEntries(Object.entries(headers)),

                body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    delete: async (url, bodyToSend, authRequired = true) => {
        try {
            let headers = {
                'Content-Type': 'application/json', // Initialize with default value
            };
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? token : ''}`,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'DELETE',
                headers: Object.fromEntries(Object.entries(headers)),

                body: bodyToSend ? JSON.stringify(bodyToSend) : undefined,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    patch: async (url, body, authRequired = true) => {
        try {
            let headers = {
                'Content-Type': 'application/json', // Initialize with default value
            };
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? token : ''}`,
                };
            } else {
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'PATCH',
                headers: Object.fromEntries(Object.entries(headers)),

                body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
};

export default API_URL;
