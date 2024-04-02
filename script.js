let posts = [
    {
        'autor': 'kamel',
        'accountImage': './img/camel-4107807_640.jpg',
        'image': 'img/chicago.jpg',
        'description': 'Chicago',
        'location': 'USA, Chicago',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 35
    },
    {
        'autor': 'katze',
        'accountImage': './img/cat-7584624_640.jpg',
        'image': './img/edinburgh.jpg',
        'description': 'Edinburgh',
        'location': 'Scotland, Edinburgh',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 76
    },
    {
        'autor': 'pferd',
        'accountImage': './img/horse-1201143_640.jpg',
        'image': './img/england.jpg',
        'description': 'Irgentwo in England',
        'location': 'England',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 23
    },
    {
        'autor': 'hund',
        'accountImage': './img/labrador-retriever-1210559_640.jpg',
        'image': './img/japan.jpg',
        'description': 'Irgentwo in Japan',
        'location': 'Japan',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 13
    },
    {
        'autor': 'löwe',
        'accountImage': './img/lion-cub-2886432_640.jpg',
        'image': './img/kanada.jpg',
        'description': 'Kanada See',
        'location': 'Canada',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 7
    },
    {
        'autor': 'minipig',
        'accountImage': './img/agriculture-84702_640.jpg',
        'image': './img/madeira.jpg',
        'description': 'Madeira',
        'location': 'Portugal, Madeira',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 8
    },
    {
        'autor': 'huhn',
        'accountImage': './img/poultry-4054105_640.jpg',
        'image': './img/neuschwanstein.jpg',
        'description': 'Neuschwanstein',
        'location': 'Germany, Neuschwanstein',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 5
    },
    {
        'autor': 'esel',
        'accountImage': './img/donkey-3636234_640.jpg',
        'image': './img/paris.jpg',
        'description': 'Paris',
        'location': 'France, Paris',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 12
    },
    {
        'autor': 'ziege',
        'accountImage': './img/goat-3613728_640.jpg',
        'image': './img/spb.jpg',
        'description': 'SPB',
        'location': 'Russia, Sankt-Petersburg',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 7
    },
    {
        'autor': 'schaf',
        'accountImage': './img/sheep-1822137_640.jpg',
        'image': './img/austria.jpg',
        'description': 'Östereich',
        'location': 'Austria',
        'comments': [],
        'herz': './img/heart-37458_640.png',
        'likesCount': 9
    }
];


function render() {
    
    let post = document.getElementById('post');
    post.innerHTML = '';    
    for (let i = 0; i < posts.length; i++) {
        loadPost(i);
        loadComment(i);
        let postValue = posts[i];
        post.innerHTML += generatePostComment(posts, i);        
        for (let j = 0; j < postValue['comments'].length; j++) {
            const element = postValue['comments'][j];
            document.getElementById(`comments${i}`).innerHTML += generateComment( element ,i, j);
        }
    }
    
}


function generateComment(element, i, j) {
    return `
    <div class="comment_section">
    <div class="one">${element}</div>
    <img src="./img/trashcan-155299_640.png" onclick="deleteComment(${i}, ${j})">
    </div>
    `
}


function generatePostComment(arr, i) {
    return `
        <div class="postInstagram">
            <div class="autor_info">
                <img class="account_image" src="${arr[i]['accountImage']}">
                <div class="title">
                    <div class="insta_autor">${arr[i]['autor']}</div>
                    <div class="location">${arr[i]['location']}</div>
                </div>
            </div>            
            <img class="post_img" src="${arr[i]['image']}">
            <div class="post_bottom">
                <div class="description">
                    <img id="like${i}" src="${arr[i]['herz']}" onclick="addLike(${i})">
                    <p id="p${i}">${arr[i]['likesCount']}</p>
                    <div class="insta_description">${arr[i]['description']}</div>                
                </div>
                <div class="comment_input">
                    <textarea id="input${i}" rows="2" placeholder="Add your Comment....."></textarea>
                    <img class="add_img" src="./img/hook-462211_640.png" onclick="addComment(${i})">
                </div>                   
                <div id="comments${i}" class="comments"></div>
            </div> 
        </div>            
    `
}


function addComment(i) {
    let input = document.getElementById(`input${i}`);
    if (input.value) {
        posts[i]['comments'].push(input.value);
        input.value = '';
        saveComment(i);
        render();
    } else {
        alert('Schreiben Sie bitte Ihre Kommentar!');
    }

}


function deleteComment(i, j) {
    posts[i]['comments'].splice(j, 1);
    saveComment(i);
    render();
}


function saveComment(i) {
    let commetAsText = JSON.stringify(posts[i]['comments']);
    localStorage.setItem(`comments${i}`, commetAsText);
}


function loadComment(i) {
    let commentAsText = localStorage.getItem(`comments${i}`);
    if (commentAsText) {
        posts[i]['comments'] = JSON.parse(commentAsText);
    }
}


function addLike(i) {
    let element = document.getElementById(`like${i}`);
    let anzahl = posts[i]['likesCount'];
    let p = document.getElementById(`p${i}`);    
    
    if (element.getAttribute('src') == "./img/heart-41099_640.png") {
        p.innerHTML = posts[i]['likesCount'] - 1;        
        element.src = "./img/heart-37458_640.png";
        posts[i]['herz'] = "./img/heart-37458_640.png";
        posts[i]['likesCount'] = anzahl - 1;

    } else {
        element.src = "./img/heart-41099_640.png";
        posts[i]['herz'] = "./img/heart-41099_640.png";
        p.innerHTML = posts[i]['likesCount'] + 1;
        posts[i]['likesCount'] = anzahl + 1;  
    }
    savePost(i);
    render();
}


function savePost(i) {
    let like = JSON.stringify(posts[i]['herz']);
    localStorage.setItem(`postArr${i}`, like);

    let likeCount = JSON.stringify(posts[i]['likesCount']);
    localStorage.setItem(`postLike${i}`, likeCount);
    
}


function loadPost(i) {
    let like = localStorage.getItem(`postArr${i}`);
     if (like) {
         posts[i]['herz'] = JSON.parse(like);
     }

    let likeCount = localStorage.getItem(`postLike${i}`);
    if (likeCount) {
        posts[i]['likesCount'] = JSON.parse(likeCount);
    }
}