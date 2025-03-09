const cron = require("node-cron");
const Election = require("../models/Election");
const axios = require("axios");

// Cron job'u belirli bir zaman diliminde çalışacak şekilde ayarlıyoruz (örneğin, her gün saat 00:00'da)
cron.schedule("* * * * *", async () => {
  console.log(
    "Scheduled task started: Checking elections for results calculation"
  );

  try {
    // Seçimleri veritabanından alıyoruz
    const elections = await Election.findAll();
    console.log("Fetched elections:", elections);

    for (let election of elections) {
      const currentDate = new Date();
      const endDate = new Date(election.endDate);

      console.log(`Checking election ${election.id}:`);
      console.log(`Current Date: ${currentDate}`);
      console.log(`End Date: ${endDate}`);

      if (currentDate >= endDate) {
        console.log(
          `Election ${election.id} has ended. Requesting result calculation.`
        );

        // API çağrısı
        const response = await axios.post(
          `${process.env.RESULT_SERVICE_URL}/api/results/calculate/${election.id}`
        );
        console.log("Result calculation response:", response.data);
      }
    }

    console.log(
      "Scheduled task completed: Election results calculation triggered."
    );
  } catch (error) {
    console.error("Error in scheduled task:", error.message);
  }
});
