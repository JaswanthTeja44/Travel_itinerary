    document.getElementById('itinerary-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const destination = document.getElementById('destination').value.trim();
      const days = parseInt(document.getElementById('days').value);
      const preferences = document.getElementById('preferences').value.trim().toLowerCase();
      const output = document.getElementById('output');
      output.innerHTML = '';

      if (!destination || isNaN(days) || days < 1) {
        alert('Please enter valid input.');
        return;
      }

      const places = [
        'Local Landmarks', 'Popular Restaurants', 'Cultural Museums', 'Scenic Parks', 'Shopping Areas', 'Art Galleries'
      ];

      for (let i = 1; i <= days; i++) {
        const suggestion = preferences ? preferences.split(',')[i % preferences.split(',').length].trim() : places[i % places.length];
        const travelTime = (Math.random() * 2 + 1).toFixed(1);

        const dayPlan = document.createElement('div');
        dayPlan.className = 'day-plan fade-in';
        dayPlan.innerHTML = `
          <h3>Day ${i}</h3>
          <p><strong>Suggested Activity:</strong> Visit ${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)} in ${destination}</p>
          <p><strong>Estimated Travel Time:</strong> ${travelTime} hours</p>
        `;

        output.appendChild(dayPlan);
      }

      // Export Options: Text and CSV
      const exportWrapper = document.createElement('div');
      exportWrapper.style.marginTop = '1rem';

      const exportTextBtn = document.createElement('button');
      exportTextBtn.textContent = 'Export as Text';
      exportTextBtn.onclick = () => {
        let content = 'Travel Itinerary for ' + destination + '\n\n';
        document.querySelectorAll('.day-plan').forEach((div, idx) => {
          const activity = div.querySelector('p:nth-child(2)').textContent;
          const time = div.querySelector('p:nth-child(3)').textContent;
          content += `Day ${idx + 1}: ${activity}\n${time}\n\n`;
        });
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${destination}_itinerary.txt`;
        link.click();
      };

      const exportCSVBtn = document.createElement('button');
      exportCSVBtn.textContent = 'Export as CSV';
      exportCSVBtn.style.marginLeft = '1rem';
      exportCSVBtn.onclick = () => {
        let content = 'Day,Activity,Estimated Travel Time\n';
        document.querySelectorAll('.day-plan').forEach((div, idx) => {
          const activity = div.querySelector('p:nth-child(2)').textContent.replace(/,/g, '');
          const time = div.querySelector('p:nth-child(3)').textContent;
          content += `${idx + 1},${activity},${time}\n`;
        });
        const blob = new Blob([content], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${destination}_itinerary.csv`;
        link.click();
      };

      exportWrapper.appendChild(exportTextBtn);
      exportWrapper.appendChild(exportCSVBtn);
      output.appendChild(exportWrapper);
    });