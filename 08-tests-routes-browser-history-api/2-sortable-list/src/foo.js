export default class SortableList {
  element;

  constructor (elementList) {
    this.elementList = elementList.items
    this.render()
  }

  render () {
    const element = this.getTemplate(this.elementList)

    this.element = element;
    this.initEventListeners()
  }

  // вот так должен выглядеть метод
  // initEventListeners () {
  //   this.element.addEventListener('pointerdown', event => {
  //     this.onPointerDown(event);
  //   });
  // }

  initEventListeners = () => {
    for ( const li of this.element.childNodes) {
      // Вот тут не нужно добавлять обработчик на каждый `li`
      // следует добавить обработчик глобальный на `this.element`
      // в обработчике проверит а на каком элементе произошло событие? на `li`?
      li.addEventListener('pointerdown',(event)=>{
        this.placeholderElement = li;

        // не копируйте, просто создайте `placeholder`
        // createPlaceholderElement (width, height) {
        //   const element = document.createElement('li');
        //
        //   element.className = 'sortable-list__placeholder';
        //   element.style.width = `${width}px`;
        //   element.style.height = `${height}px`;
        //
        //   return element;
        // }
        this.placeholder = this.placeholderElement.cloneNode()
        this.placeholder.classList.add('sortable-list__placeholder')

        let shiftY = event.clientY - li.getBoundingClientRect().top;


        this.prevElem = this.placeholderElement.previousElementSibling;

        li.style.position = 'absolute';

        li.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

        function moveAt(pageY) {
          li.style.top = pageY - shiftY + 'px';
        }

        // это должен быть метод класса чтобы каждый раз
        // не конструировать этот обработчик
        const onMouseMove = (event) => {
          moveAt(event.pageX, event.pageY);
          this.prevElem = this.placeholderElement.previousElementSibling;
          this.nextElem = this.placeholderElement.nextElementSibling;

          if(this.prevElem && this.placeholderElement.getBoundingClientRect().top < this.prevElem.getBoundingClientRect().bottom) {
            this.prevElem.before(this.placeholder)
            this.prevElem.before(this.placeholderElement)
          }

          if(this.nextElem && this.placeholderElement.getBoundingClientRect().top > this.nextElem.getBoundingClientRect().top) {
            this.nextElem.after(this.placeholder)
            this.nextElem.after(this.placeholderElement)
          }
        }

        // вот так должны выглядеть методы
        // addDocumentEventListeners () {
        //   document.addEventListener('pointermove', this.onPointerMove);
        //   document.addEventListener('pointerup', this.onPointerUp);
        // }

        // removeDocumentEventListeners () {
        //   document.removeEventListener('pointermove', this.onPointerMove);
        //   document.removeEventListener('pointerup', this.onPointerUp);
        // }

        this.element.addEventListener('pointermove', onMouseMove);

        this.element.addEventListener('pointerup', (event) =>{
          this.placeholderElement.style.position = "static"
          this.placeholder.remove()
          this.element.removeEventListener('pointermove', onMouseMove);
          li.onmouseup = null;
        });
      })
      li.ondragstart = function() {
        return false;
      };
    }

  }

  getTemplate (elementList) {
    const wrap = document.createElement('ul')
    wrap.classList.add('sortable-list')

    elementList.map((item)=> {
      item.classList.add('sortable-list__item')
      wrap.append(item)
    })

    return wrap
  }


  remove () {
    if(this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
  }
}
