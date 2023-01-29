function Sumb() {
    user = document.getElementById("amos").value;
    console.log(user);
    localStorage.setItem("Username", user);
    window.location = "kwitter_room.html";

}