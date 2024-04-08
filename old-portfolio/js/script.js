
//#region Initialization

"use strict";

/**
 * Initalization of anything that needs to be called at the beginning
 */
const init = () =>
{
    
};

//#endregion

//#region Objects

/**
 * An object that represents any portfolio module from which an HTML
 * element can be generated from
 */
class Module
{
    /**
     * Returns an HTML element of this module
     * @returns {HTMLElement} the generated element
     */
    generateHTML()
    {
        return new HTMLElement();
    }
}

/**
 * An object that contains useful information about an image such as alt text
 */
class SemanticImage extends Module
{
    /**
     * Creates a new semantic image
     * @param {string} src source path to image
     * @param {string} alt alt text to image
     */
    constructor(src, alt)
    {
        this.src = src;
        this.alt = alt;
    }

    generateHTML()
    {

    }
}

/**
 * An "enum" representing the orientations of a tooltip
 * @readonly
 * @enum {string}
 */
const TOOLTIP_POSITION =
    Object.freeze({ UP: "ttUp", DOWN: "ttDown", LEFT: "ttDown", RIGHT: "ttRight" });

/**
 * An object representing a tool tipped element where something shows up upon hovering
 */
class Tooltip extends Module
{
    /**
     * Creates a new tooltip with the specified text and position
     * @param {string} text the text to be displayed by the tooltip
     * @param {TOOLTIP_POSITION} position the position which the tooltip
     * should be positioned
     */
    constructor(text, position)
    {
        this.text = text;
        this.position = position;
    }
}

/**
 * An object that contains useful information about a link
 */
class SemanticLink extends Module
{
    /**
     * Creates a new rich link
     * @param {string} href link adress
     * @param {string} text display text for link 
     * @param {string} hover text to display when hovering over link
     */
    constructor(href, text, hover = null)
    {
        this.href = href;
        this.text = text;
        this.hover = hover;
    }

    /**
     * Returns a tool tipped element from this link
     * @returns {HTMLElement} generates the tool tipped element
     */
    generateHTML()
    {
        return createElement("div", {}, ["toolTipped"]).append(
            createElement("a", { href: link.href, innerText: link.text }),
            createElement("span", { }, ["toolTip", "ttBottom"])
        );
    }
}

/**
 * An object that contains multiple images
 */
class Gallery extends Module
{
    /**
     * Creates a new gallery
     * @param {SemanticImage[]} images the array of semantic images
     */
    constructor(images)
    {
        this.images = images;
    }

    /**
     * Returns the HTML for this gallery
     * @returns {HTMLElement}
     */
    generateHTML()
    {
        const galleryHTML = createElement("div");
        for(const image of this.images)
        {
            galleryHTML.append(image);
        }
        return galleryHTML;
    }
}

/**
 * A container for portfolio entries
 */
class Entry extends Module
{
    /**
     * Creates a new entry with the specified parameters
     * @param {string} title title of entry
     * @param {string} id the html id that should be used for this entry
     * @param {string} subtitle optional subtitle of entry
     * @param {SemanticImage} coverImage main image
     * @param {string} shortDescription brief summary of entry for minimized use
     * @param {string} fullDescription full description of entry
     * @param {Gallery} gallery gallery to be shown in full view
     * @param {SemanticLink[]} links array of strings containing external links to references
     */
    constructor(title, id, shortDescription, fullDescription, subtitle = null, coverImage = null,
        gallery = [], links = [])
    {
        this.title = title;
        this.id = id;
        this.subtitle = subtitle;
        this.coverImage = coverImage;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.gallery = gallery;
        this.links = links;
    }

    /**
     * Returns the HTML for this entry
     * @returns {HTMLElement}
     */
    generateHTML()
    {
        //Create preview html entry
        const article = createElement("article", { id: "entry-" + this.id });

        //Create inside html for entry, chaining to make things easier
        article.chainAppend(
            createElement("h3", { innerText: this.title }),
            createElement("h4", { innerText: this.subtitle }),
            createElement("img", { src: this.coverImage.src, alt: this.coverImage.alt }),
            createElement("p", { innerText: this.shortDescription }),
            this.gallery.generateHTML()
        );

        //Generate link HTML
        for(const link of this.links)
        {
            article.append()
        }
    }
}

//#endregion

//#region Element Extensions

/**
 * Creates an element from the specified type and standard attributes. Non-standard attributes,
 * datasets, classes, etc need to be added outside
 * @param {string} elementType the type of element to create
 * @param {object} attributes an object that contains key value pairs of attributes.
 * Only works with standard attributes,
 * @param {Array} classes a list of classes to add if needed
 * @param {object} datasets a list of datasets to add if needed
 * @param {object} nonStandardAttributes a list of non-standard attributes to add if needed
 * @returns {HTMLElement} the created element
 */
const createElement = (elementType, attributes,
    classes = [], datasets = {}, nonStandardAttributes = {}) =>
{
    //Create the element from the specified type
    const element = document.createElement(elementType);
    
    //Add the attributes based on the object properties
    //Use bracket notation to access the property (weird)
    for(let attribute in attributes) element[attribute] = attributes[attribute];

    //Add classes
    for(let className of classes) element.classList.add(className);

    //Add datasets
    for(let dataName in datasets) element.dataset[dataName] = datasets[dataName];

    //Add nonstandards
    for(let attribute in nonStandardAttributes)
        element.setAttribute(attribute, nonStandardAttributes[attribute]);
    
    return element;
}

/**
 * Clears all inner html of the specified element
 * @param {HTMLElement} element element to clear
 */
HTMLElement.prototype.clearElement = function() { this.innerHTML = ""; }

/**
 * Appends the specified elements and returns itself allowing
 * for the chaining of append calls
 * @param  {...Node | string} nodes The nodes or strings to append
 * @returns This element
 */
HTMLElement.prototype.chainAppend = function(...nodes)
{
    this.append(nodes);
    return this;
}

//#endregion


function toggleMenu()
    {
        let sideBar = document.querySelector("aside");
        if(sideBar.style.translate == "0%")
        {
            sideBar.style.translate = "-100%";
        }
        else
        {
            sideBar.style.translate = "0%";
        }
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
    addEventListener("resize", (event) => {});

    onresize = (event) =>
    {
        let sideBar = document.querySelector("aside");
        if(window.innerWidth >= 850)
        {
            sideBar.style.translate = "0%";
        }
        else
        {
            sideBar.style.translate = "-100%";
        }
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
    function highlightNavigation(contentId)
    {
        let highlightElement = document.querySelector(contentId);
        if(highlightElement)
        {
            highlightElement.style.borderColor = "#d3cf00";
            setTimeout(() =>
            {
                highlightElement.style = "";
            }, 500);
        }
    }

    // function maximizeArticle(contentId)
    // {
    //     let maximizeElement = document.querySelector(contentId);
    //     if(maximizeElement)
    //     {
    //         if(maximizeElement.style.position === "fixed")
    //         {
    //             maximizeElement.style = "";
    //         }
    //         else
    //         {
    //             maximizeElement.style.position = "fixed";
    //             maximizeElement.style.margin = "auto";
    //             maximizeElement.style.zIndex = "10";
    //             maximizeElement.style.display = "block";
    //             maximizeElement.style.width = "100vw";
    //             maximizeElement.style.height = "100vh";
    //         }
            
    //     }
    // }


//Call init when page loads and all functions and classes have been created
window.addEventListener("load", init);