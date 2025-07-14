import BirthdateList from "../../molecules/Birthday-List/BirthdayList";
import StatsCards from "../../molecules/stats-cards/StastCards";
import Grid from "@mui/material/Grid";

const Home = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <StatsCards />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <h2 style={{ color: "#000000ff" }}>Espacio para gráficos</h2>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <BirthdateList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
