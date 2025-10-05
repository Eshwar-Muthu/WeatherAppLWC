# 🌦️ Salesforce Weather App (LWC + Apex Integration)

A simple and interactive **Weather Application** built using **Lightning Web Components (LWC)** and **Apex** on the Salesforce Platform.  
This project fetches **real-time weather data** for any city using the **OpenWeatherMap API** and displays it beautifully within a Salesforce Lightning page.

---

## 🚀 Project Overview

The app allows users to enter a city name and view current weather information — including **temperature, humidity, and weather conditions** — all fetched dynamically from the OpenWeatherMap API.

The LWC frontend handles user input and rendering, while the Apex backend manages the API callout and data retrieval.

---

## ⚙️ How It Works

1. The user enters a city name in the LWC.
2. The LWC calls an Apex method via `@AuraEnabled`.
3. The Apex class sends an **HTTP GET request** to the OpenWeatherMap API.
4. The live weather data (in JSON) is returned to the LWC.
5. The LWC parses and displays the data with appropriate weather icons.

---

## 🧩 Components Included

| Component | Description |
|------------|-------------|
| **LWC: `weatherApp`** | UI layer built with HTML, JavaScript, and CSS using Lightning Web Components. |
| **Apex Class: `WeatherAppApexClass`** | Handles the HTTP callout to the OpenWeatherMap API. |
| **Custom Label: `WeatherAppAPIKey`** | Stores the API key securely. |
| **Static Resource: `weatherAppIcons`** | Folder containing SVG weather icons used in the app UI. |

---

## 🛠️ Setup Instructions

1. **Clone or Deploy the Component**
   - Copy this LWC bundle, Apex class, and metadata files into your Salesforce org (`force-app/main/default/` directory if using SFDX).

2. **Create a Custom Label**
   - Navigate to **Setup → Custom Labels → New Custom Label**
   - **Name:** `WeatherAppAPIKey`  
   - **Value:** `<Your OpenWeatherMap API key>`  

3. **Upload Static Resources**
   - Go to **Setup → Static Resources → New**
   - **Name:** `weatherAppIcons`
   - **Upload:** your icon folder containing files like `cloud.svg`, `clear.svg`, `rain.svg`, etc.

4. **Deploy Components**
   - Use Salesforce CLI or VS Code to deploy:
     ```bash
     sfdx force:source:deploy -p force-app/main/default
     ```

5. **Add the Component to a Lightning Page**
   - Go to **App Builder** and drag the `weatherApp` LWC onto a Lightning record or app page.

---

## 🧠 Concepts Covered & Learned

- ⚡ **LWC to Apex communication** using `@AuraEnabled` methods  
- 🌐 **HTTP Callouts** from Apex to external REST APIs  
- 🔒 **Custom Labels** for secure API key management  
- 🧱 **Static Resources** for icon management  
- 🎨 **SLDS + Custom CSS** for responsive UI design  
- 🧩 **JSON parsing** and dynamic data handling  
- 💬 **Error handling** for invalid city names or failed responses  




