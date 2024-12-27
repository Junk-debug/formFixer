const inputsSelector =
  'input[type="text"], input[type="tel"], input[type="email"], input[type="password"], input[type="search"], input[type="url"], input:not([type]), textarea';

const collectInputs = () =>
  Array.from(document.querySelectorAll(inputsSelector));

function getFieldContext(inputElement) {
  const labelElement = document.querySelector(
    `label[for="${inputElement.id}"]`
  );
  const labelText = labelElement ? labelElement.innerText : "";

  const previousText = inputElement.previousElementSibling
    ? inputElement.previousElementSibling.innerText
    : "";

  const nextText = inputElement.nextElementSibling
    ? inputElement.nextElementSibling.innerText
    : "";

  const parentText = inputElement.closest("div, section, form")
    ? inputElement.closest("div, section, form").innerText
    : "";

  return {
    labelText,
    placeholder: inputElement.placeholder || null,
    id: inputElement.id || null,
    previousText,
    nextText,
    parentText,
    inputType: inputElement.type,
    name: inputElement.name || null,
    classes: inputElement.className,
  };
}

function main() {
  const inputs = collectInputs();
  inputs.forEach((input) => {
    if (input.hasAttribute("name")) {
      return;
    }

    const context = getFieldContext(input);

    const nameToPaste = (
      context.labelText ||
      context.placeholder ||
      context.parentText ||
      context.inputType ||
      context.id
    )
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/[^a-z0-9_]/g, "");

    console.log("context for ", input, context);
    console.log("name to paste", nameToPaste);

    input.setAttribute("name", nameToPaste);
  });
}

main();
