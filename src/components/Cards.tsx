import React, { useEffect, useState } from 'react';

interface ICard {
    id: number;
    text: string;
    order: number;
}

const Cards = () => {
    const [cardList, setCardList] = useState<ICard[]>([
        {id: 1, order: 1, text: 'КАРТОЧКА 1'},
        {id: 2, order: 2, text: 'КАРТОЧКА 2'},
        {id: 3, order: 4, text: 'КАРТОЧКА 3'},
        {id: 4, order: 5, text: 'КАРТОЧКА 4'},
    ]);

    const [currentCard, setCurrentCard] = useState<ICard | null>(null);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        setCurrentCard(card);
    };
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.background = 'white';
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        (e.target as HTMLDivElement).style.background = 'white';
    };

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        (e.target as HTMLDivElement).style.background = 'lightgray';
    };
    const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        e.preventDefault();
        setCardList(cardList.map(el => {
            if (el.id === card.id && currentCard) {
                return {...el, order: currentCard.order};
            }
            if (currentCard && el.id === currentCard.id) {
                return {...el, order: card.order};
            }
            return el;
        }));

        (e.target as HTMLDivElement).style.background = 'white';
    };

    const sortCards = (a: { order: number; }, b: { order: number; }) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };
    return (
        <>
        <div className="app">
            {cardList.sort(sortCards).map(card => (
                <div
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragLeaveHandler(e, card)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, card)}
                    draggable={true}
                    key={card.id}
                    className="card">
                    {card.text}
                </div>
            ))}
            <span style={{maxWidth:320}}>{JSON.stringify(cardList)}</span>
        </div>

        </>
    );
};

export default Cards;
