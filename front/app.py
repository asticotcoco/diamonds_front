import streamlit as st
import seaborn as sns
from diamonds.data import load_data
import matplotlib.pyplot as plt
import requests


st.markdown("# Diamonds Price Prediction")
df_diamonds = load_data()
st.dataframe(df_diamonds.head())
fig = sns.pairplot(df_diamonds)
plt.title("Distribution of Diamonds Prices")
st.pyplot(fig.figure)

st.markdown("## Predict price")

carat = st.number_input("Carat", min_value=0.0, step=0.01)
cut = st.selectbox("Cut", options=df_diamonds["cut"].unique())
color = st.selectbox("Color", options=df_diamonds["color"].unique())
clarity = st.selectbox("Clarity", options=df_diamonds["clarity"].unique())
x = st.number_input("X", min_value=0.0, step=0.01)
y = st.number_input("Y", min_value=0.0, step=0.01)
z = st.number_input("Z", min_value=0.0, step=0.01)  

st.button("Predict", on_click=lambda: predict_price(carat, cut, color, clarity, x, y, z))   
