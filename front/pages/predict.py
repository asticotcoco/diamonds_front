import requests
import streamlit as st

# api url
API_HOST = "https://diamonds-861302064365.europe-west1.run.app"
CUT_OPTIONS = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
COLOR_OPTIONS = ["D", "E", "F", "G", "H", "I", "J"]
CLARITY_OPTIONS = ["I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"]

st.markdown("## Predict Price")

with st.form("predict_form"):
    carat = st.slider("Carat", min_value=0.2, max_value=5.0, step=0.1)
    cut = st.selectbox("Cut", CUT_OPTIONS)
    color = st.selectbox("Color", COLOR_OPTIONS)
    clarity = st.selectbox("Clarity", CLARITY_OPTIONS)
    depth = st.slider("Depth", min_value=50.0, max_value=70.0, step=0.1)
    table = st.slider("Table", min_value=50.0, max_value=70.0, step=0.1)
    x = st.number_input("X (length in mm)", min_value=0.0, max_value=10.0, step=0.1)
    y = st.number_input("Y (width in mm)", min_value=0.0, max_value=10.0, step=0.1)
    z = st.number_input("Z (depth in mm)", min_value=0.0, max_value=10.0, step=0.1)
    predict_clicked = st.form_submit_button("Predict")

if predict_clicked:
    st.snow()
    url = f"{API_HOST}/predict_one"
    data = {
        "carat": carat,
        "cut": cut,
        "color": color,
        "clarity": clarity,
        "depth": depth,
        "table": table,
        "x": x,
        "y": y,
        "z": z,
    }
    try:
        with st.spinner("Calling prediction API..."):
            response = requests.post(url, json=data, timeout=10)
        response.raise_for_status()
        payload = response.json()
        prediction = payload.get("price")
    except requests.RequestException as exc:
        st.error("Prediction API is unreachable. Please try again.")
        st.write(str(exc))
    except ValueError:
        st.error("Prediction API returned an invalid JSON response.")
    else:
        if prediction is None:
            st.error("Prediction API response is missing 'price'.")
            st.write(payload)
        else:
            st.success(f"Predicted Price: ${prediction:.2f}")

