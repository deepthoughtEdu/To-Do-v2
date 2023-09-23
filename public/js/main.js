$('body').off('click').on('click', '[data-action]', function () {
    const data = $(this).data();
    const {action, itemId, content} = data;

    if (action == 'edit') {
        handleTodoEditAction(data);
    }
    else if (action == 'delete') {
        handleTodoDeleteAction(data)
    }
});


function handleTodoDeleteAction(data) {
    const url = '/item/' + data.itemId;

    Swal.fire({

        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',

        preConfirm: (content) => {
          return fetch(url, {method: "DELETE"}).then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }

              return response.json();

            }).catch(error => {
                Swal.showValidationMessage(error)
            });
        },
        
        allowOutsideClick: () => !Swal.isLoading()

      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: result.value.message,
          }).then(() => location.reload())
        }
      })
}


function handleTodoEditAction(data) {
    const url = '/item/' + data.itemId;

    Swal.fire({
        title: 'Updating your To-Do',
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        inputValue: data.content,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (content) => {
          return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newItem: content}),
          }).then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }

              return response.json();

            }).catch(error => {
                Swal.showValidationMessage(error)
            });
        },
        allowOutsideClick: () => !Swal.isLoading()

      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: result.value.message,
          }).then(() => location.reload())
        }
      })
}