export function createListItems(strings , ulId ) {
    const ulElement = document.getElementById(ulId);
    if (ulElement && ulElement.tagName === 'UL') {
      strings.forEach((str) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = str;
        ulElement.appendChild(liElement);
      });
    } else {
      console.error('Invalid ulId or element is not a <ul> tag');
    }
  }