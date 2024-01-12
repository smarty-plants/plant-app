export default async function handler(req, res) {
    console.log('API: probe');
    const response = await fetch(process.env.API_URL + '/plants/');
    const data = await response.json();
  
    res.status(200).json(data);
  }