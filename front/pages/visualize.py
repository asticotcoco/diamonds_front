import streamlit as st
import matplotlib.pyplot as plt

from diamonds.data import load_data
from pandas.plotting import autocorrelation_plot
import plotly.express as px

@st.cache_data
def load_diamonds_data():
    return load_data()


df_diamonds = load_diamonds_data()

st.dataframe(df_diamonds)


fig = px.scatter_3d(df_diamonds, x="x", 
                 y="y", z="z", color="cut",
                 title="Price vs Carat by Cut")
st.plotly_chart(fig)

fig_auto, ax = plt.subplots()
autocorrelation_plot(df_diamonds["price"], ax=ax)
ax.set_title("Autocorrelation of Diamond Prices")
st.pyplot(fig_auto)