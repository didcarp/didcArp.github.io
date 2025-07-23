const table = document.getElementById('usersTable');
const tableHeadRow = document.getElementById('tableHeadRow');
const tableBody = table.querySelector('tbody');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const columns = data.Columns;
    const rows = data.Rows;

    //Створюємо заголовки
    columns.forEach(col =>
	{
      const th = document.createElement('th');
      th.textContent = col.Title || '';
      th.title = col.ToolTip || '';
      th.style.cursor = 'help';
      tableHeadRow.appendChild(th);
    });

    //Створюємо рядки
    rows.forEach(rowData =>
	{
      const tr = document.createElement('tr');
      columns.forEach(col =>
	  {
        const td = document.createElement('td');
        const value = rowData[col.Key];
        const type = col.Type;

        switch (type)
		{
          case 'Image':
            td.innerHTML = `<img src="${value}" alt="${rowData.Name}" width="40" height="40" style="border-radius:50%;">`;
            break;

          case 'Emoji':
            td.textContent = value || '';
            break;

          case 'Audio':
            td.innerHTML = `<audio controls preload="none" style="width: 100%;">
							<source src="${value}" type="audio/mpeg">
							Ваш браузер не підтримує аудіо.</audio>`;
            break;

          case 'Video':
            td.innerHTML = `<video width="120" height="80" controls preload="none" style="border-radius:8px;">
							<source src="${value}" type="video/mp4">
							Ваш браузер не підтримує відео.</video>`;
            break;

          default:
            td.textContent = value !== undefined ? value : '—';
        }

        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });
  })
  .catch(err =>
  {
    console.error('❌ Помилка завантаження:', err);
    tableBody.innerHTML = `<tr><td colspan="100%">Не вдалося завантажити дані</td></tr>`;
  });
