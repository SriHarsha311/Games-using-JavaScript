 document.addEventListener('DOMContentLoaded', () => {
     const cardArray = [{
             name: 'cat',
             img: 'images/cat.png'
         },
         {
             name: 'cat',
             img: 'images/cat.png'
         },
         {
             name: 'horse',
             img: 'images/horse.png'
         },
         {
             name: 'horse',
             img: 'images/horse.png'
         },
         {
             name: 'wolf',
             img: 'images/wolf.png'
         },
         {
             name: 'wolf',
             img: 'images/wolf.png'
         },
         {
             name: 'lion',
             img: 'images/lion.png'
         },
         {
             name: 'lion',
             img: 'images/lion.png'
         },
         {
             name: 'elephant',
             img: 'images/elephant.png'
         },
         {
             name: 'elephant',
             img: 'images/elephant.png'
         },
         {
             name: 'owl',
             img: 'images/owl.png'
         },
         {
             name: 'owl',
             img: 'images/owl.png'
         },
         {
             name: 'fox',
             img: 'images/fox.png'
         },
         {
             name: 'fox',
             img: 'images/fox.png'
         },
         {
             name: 'tiger',
             img: 'images/tiger.png'
         },
         {
             name: 'tiger',
             img: 'images/tiger.png'
         },
         {
             name: 'rabbit',
             img: 'images/rabbit.png'
         },
         {
             name: 'rabbit',
             img: 'images/rabbit.png'
         },
         {
             name: 'zebra',
             img: 'images/zebra.png'
         },
         {
             name: 'zebra',
             img: 'images/zebra.png'
         }
     ]

     const grid = document.querySelector('.grid');
     var cardsChosen = [];
     var cardsChosenId = [];
     var cardsWon = [];
     cardArray.sort(() => Math.random() - 0.5);
     console.log(cardArray);
     const len = cardArray.length;
     const resultDisplay = document.querySelector('#result');

     function createBoard() {
         for (let i = 0; i < len; i++) {
             var card = document.createElement('img');
             card.setAttribute('src', 'images/blank.png');
             card.setAttribute('data-id', i);
             console.log(card);
             card.addEventListener('click', flipCard);
             grid.appendChild(card);
         }
     }

     function checkForMatch() {
         var cards = document.querySelectorAll('img');
         const optionOneId = cardsChosenId[0];
         const optionTwoId = cardsChosenId[1];
         if (cardsChosen[0] === cardsChosen[1]) {
             cardsWon.push(cardsChosen);
             if (cardsWon.length === cardArray.length / 2) {
                 alert("Well done");
             } else {
                 alert("Noice!!");
             }
         } else {
             cards[optionOneId].setAttribute('src', 'images/blank.png');
             cards[optionTwoId].setAttribute('src', 'images/blank.png');
             alert("Oops!!!Wrong");
             cards[optionOneId].addEventListener('click', flipCard);
             cards[optionTwoId].addEventListener('click', flipCard);
         }
         cardsChosen = [];
         cardsChosenId = [];
         resultDisplay.textContent = cardsWon.length;
     }

     function flipCard() {
         this.removeEventListener('click', flipCard);
         var cardId = this.getAttribute('data-id');
         console.log(cardId);
         cardsChosen.push(cardArray[cardId].name);
         cardsChosenId.push(cardId);
         this.setAttribute('src', cardArray[cardId].img);
         if (cardsChosen.length === 2) {
             setTimeout(checkForMatch, 100);
         }
     }
     createBoard();
 })