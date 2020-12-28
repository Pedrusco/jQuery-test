// pega o searchContainer
const searchContainer = $('#searchContainer')

// adicionando o campo do input
searchContainer.append('<input type="text" name="search" id="search" />')

// pegar os dados do da tabela
const dataTable = $("#doctors").children()

// função para interar os dados da tabela
const tableItem = (index, item) => {
  const tr = $('data-upin');
  return tr;
}

// pegar dados da tabela
$.each(dataTable, tableItem);

// pegar os dados do backend
const resultDoctor = $.ajax({
    url: 'http://localhost:3030/doctors',
    data: {},
    success: () => console.log('teste'),
    dataType: 'json'
})

console.log(resultDoctor.responseJSON);