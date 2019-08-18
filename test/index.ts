import jsonToHtml from '../src/index';
import './style.scss';

const schema1 = {
    tag: 'div',
    children: [
        {
            tag: 'div',
            class: 'innerDiv',
            children: [
                {
                    tag: 'p',
                    children: 'pppppp'
                },
                {
                    tag: 'h1',
                    children: 'h1h1h1h1'
                },
            ]
        },
        {
            tag: 'span',
            children: '这是span1'
        },
        {
            tag: 'span',
            children: '这是span2'
        },
    ]
};

const htmlText1 = jsonToHtml(schema1, {raw: false, wrap: true});
console.log(htmlText1);

let pre1 = document.createElement('pre');
pre1.innerHTML = htmlText1;
document.body.appendChild(pre1);
