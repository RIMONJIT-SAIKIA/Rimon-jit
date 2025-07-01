function toggleMenu() {
    var menu = document.getElementById('menu');
    if(menu.style.display === 'block'){
        menu.style.display = 'none';
    }else{
        menu.style.display = 'block';
    }
}

let buttons = document.querySelectorAll(".modebtn");
let body = document.querySelector("body");

function clearThemes() {
  body.classList.remove("dark", "default","light", "bluish", "neon");
}
document.body.classList.add(localStorage.getItem('theme'));
buttons.forEach(button => {
  button.addEventListener("click", () => {
    clearThemes();
    let mode = button.getAttribute("data-mode");
    body.classList.add(mode);
    localStorage.setItem('theme', mode );
    console.log("Theme changed to:", mode); // Debug check
  });
});
const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Add active class to the clicked tab and its content
      tab.classList.add("active");
      document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
    });
  });

