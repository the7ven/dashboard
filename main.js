  // Graphique des tendances de stock
  const stockTrendCtx = document.getElementById('stockTrendChart').getContext('2d');
  new Chart(stockTrendCtx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
              label: 'Niveau de stock',
              data: [1200, 1250, 1180, 1300, 1245, 1285],
              borderColor: '#2196f3',
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          plugins: {
              title: {
                  display: true,
                  text: 'Tendance des stocks sur 6 mois'
              }
          }
      }
  });

  // Graphique en secteurs par catégorie
  const categoryPieCtx = document.getElementById('categoryPieChart').getContext('2d');
  new Chart(categoryPieCtx, {
      type: 'doughnut',
      data: {
          labels: ['Smartphones', 'Ordinateurs', 'Audio', 'Accessoires'],
          datasets: [{
              data: [30, 25, 20, 25],
              backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336']
          }]
      },
      options: {
          responsive: true,
          plugins: {
              title: {
                  display: true,
                  text: 'Répartition des stocks par catégorie'
              }
          }
      }
  });

  // Fonction de tri du tableau
  function sortTable(n) {
      const table = document.getElementById("productsTable");
      let switching = true;
      let direction = "asc";
      let switchcount = 0;

      while (switching) {
          switching = false;
          const rows = table.rows;

          for (let i = 1; i < (rows.length - 1); i++) {
              let shouldSwitch = false;
              const x = rows[i].getElementsByTagName("TD")[n];
              const y = rows[i + 1].getElementsByTagName("TD")[n];
              
              // Conversion pour le tri numérique si nécessaire
              const xValue = n === 2 ? parseFloat(x.innerHTML.replace('€', '')) :
                           n === 3 ? parseInt(x.innerHTML) :
                           x.innerHTML.toLowerCase();
              const yValue = n === 2 ? parseFloat(y.innerHTML.replace('€', '')) :
                           n === 3 ? parseInt(y.innerHTML) :
                           y.innerHTML.toLowerCase();

              if (direction === "asc") {
                  if (xValue > yValue) {
                      shouldSwitch = true;
                      break;
                  }
              } else {
                  if (xValue < yValue) {
                      shouldSwitch = true;
                      break;
                  }
              }
          }

          if (shouldSwitch) {
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
              switchcount++;
          } else {
              if (switchcount === 0 && direction === "asc") {
                  direction = "desc";
                  switching = true;
              }
          }
      }
  }

  // Fonction de recherche
  function searchProducts() {
      const input = document.querySelector('.search-input');
      const filter = input.value.toLowerCase();
      const tbody = document.querySelector('tbody');
      const rows = tbody.getElementsByTagName('tr');

      for (let row of rows) {
          const cells = row.getElementsByTagName('td');
          let found = false;
          for (let cell of cells) {
              if (cell.textContent.toLowerCase().indexOf(filter) > -1) {
                  found = true;
                  break;
              }
          }
          row.style.display = found ? '' : 'none';
      }
  }

  // Fonction de filtrage par statut
  function filterTable(status) {
      const tbody = document.querySelector('tbody');
      const rows = tbody.getElementsByTagName('tr');

      for (let row of rows) {
          const statusCell = row.querySelector('.status');
          if (status === 'all') {
              row.style.display = '';
          } else {
              row.style.display = statusCell.classList.contains(status) ? '' : 'none';
          }
      }
  }