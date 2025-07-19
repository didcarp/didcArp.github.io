const table = document.getElementById('usersTable');
const tableHeadRow = document.getElementById('tableHeadRow');
const tableBody = table.querySelector('tbody');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const columns = data.columns;
    const rows = data.rows;

    // 🔸 Створюємо заголовки
    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = `${col.title}`;
      th.title = col.tooltip || '';
      th.style.cursor = 'help';
      tableHeadRow.appendChild(th);
    });

    // 🔸 Створюємо рядки
    rows.forEach(rowData => {
      const tr = document.createElement('tr');

      columns.forEach(col => {
        const td = document.createElement('td');
        const value = rowData[col.key];

        switch (col.type) {
          case 'image':
            td.innerHTML = `<img src="${value}" alt="${rowData.name}" width="40" height="40" style="border-radius:50%;">`;
            break;

          case 'emoji':
            td.textContent = value || '❓';
            break;

          case 'audio':
            td.innerHTML = `
              <audio controls preload="none" style="width: 100px;">
                <source src="${value}" type="audio/mpeg">
                Ваш браузер не підтримує аудіо.
              </audio>`;
            break;

          case 'video':
            td.innerHTML = `
              <video width="120" height="80" controls preload="none" style="border-radius:8px;">
                <source src="${value}" type="video/mp4">
                Ваш браузер не підтримує відео.
              </video>`;
            break;

          default:
            td.textContent = value !== undefined ? value : '—';
        }

        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error('❌ Помилка завантаження:', err);
    tableBody.innerHTML = `<tr><td colspan="100%">Не вдалося завантажити дані</td></tr>`;
  });