export function createListItems(strings:string[] , ulId: string ) {
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

export function showError(errorString: string): void {
    console.error(errorString);
    if (typeof errorString !== "string") {
      document.getElementById("debug")!.innerHTML =
        "printing value that is not a string " + errorString;
    } else {
      document.getElementById("debug")!.innerHTML = errorString;
    }
  }
