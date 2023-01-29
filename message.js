room_name = localStorage.getItem("Room_Name");
user_name = localStorage.getItem("Username");

function QendMO() {


    document.getElementById("titlern").innerHTML = "Welcome " + user_name + " To the Amazing " + room_name + "!";
}

function Sene() {
    msg = document.getElementById("wcha").value;
    firebase.database().ref(room_name).push({
        username: user_name,
        likes: 0,
        message: msg
    })
    document.getElementById("wcha").innerHTML = "";
}

function Mnaa() {

    localStorage.removeItem("Username");
    window.location = "index.html"
}

var firebaseConfig = {
    apiKey: "AIzaSyCn_jnX494ecAxrXz8LQh1auGJXuB91oyo",
    authDomain: "kwitterproject-2521e.firebaseapp.com",
    databaseURL: "https://kwitterproject-2521e-default-rtdb.firebaseio.com",
    projectId: "kwitterproject-2521e",
    storageBucket: "kwitterproject-2521e.appspot.com",
    messagingSenderId: "604431470198",
    appId: "1:604431470198:web:123e20033ce69d29a69957"
};

firebase.initializeApp(firebaseConfig);

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);

                name1 = message_data['username']
                Message1 = message_data['message']
                Likes1 = message_data['likes']

                n = " <h4>" + name1 + "<img src='tick.png' class='user_tick'>  </h4>";
                m = "<h4 class='message_h4'>" + Message1 + "</h4>";
                l = "<button class='btn btn-warning' id=" + firebase_message_id + " onclick='UpdateL(this.id)' value=" + Likes1 + ">";
                lt = "<span class = 'glyphicon glyphicon-thumbs-up'></span>Likes: " + Likes1 + "</button>";

                r = n + m + l + lt;
                document.getElementById("output").innerHTML += r;
                //End code
            }
        });
    });
}
getData();

function updateL(firebase_message_id) {
    console.log("Clicked on Like Button-" + firebase_message_id);
    fmi = firebase_message_id;
    likes = document.getElementById(fmi).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(firebase_message_id).update({
        likes: updated_likes
    });
}