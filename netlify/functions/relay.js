let relayState = "off";   // Default state
let sensorData = { temperature: null, humidity: null };  // Store temp & humidity

exports.handler = async (event, context) => {
  // Endpoint for setting relay state
  if (event.path.includes("/api/setRelay")) {
    const state = event.queryStringParameters.state;
    if (state === "on" || state === "off") {
      relayState = state;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, relay: relayState }),
      };
    } else {
      return { statusCode: 400, body: "Invalid state" };
    }
  }

  // Endpoint for receiving sensor data (POST)
  if (event.path.includes("/api/sendData") && event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    sensorData.temperature = body.temperature;
    sensorData.humidity = body.humidity;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, received: sensorData }),
    };
  }

  // Endpoint for retrieving sensor data
  if (event.path.includes("/api/getData")) {
    return {
      statusCode: 200,
      body: JSON.stringify(sensorData),
    };
  }

  // Default: get relay state
  return {
    statusCode: 200,
    body: JSON.stringify({ relay: relayState }),
  };
};

