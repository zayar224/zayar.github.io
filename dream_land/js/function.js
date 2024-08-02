// Home Script
// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});

// End Of Home Script


// Initialize Bootstrap popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

// Responsive navigation
function resposiveNav() {
    var x = document.getElementById("icon_nav");
    if (x.className === "side_nav_1") {
        x.className += " responsive";
    } else {
        x.className = "side_nav_1";
    }
}

// Set width of elements
function setWidth(elementId, width) {
    document.getElementById(elementId).style.width = width;
}

// Open and close elements
function openElement(elementId) {
    setWidth(elementId, "300px");
}

function closeElement(elementId) {
    setWidth(elementId, "0");
}

function openDesign() {
    openElement("Design");
}

function closeDesign() {
    closeElement("Design");
}

function openElements() {
    openElement("Elements");
}

function closeElements() {
    closeElement("Elements");
}

function openText() {
    openElement("Text");
}

function closeText() {
    closeElement("Text");
}

function openUpload() {
    openElement("Upload");
}

function closeUpload() {
    closeElement("Upload");
}

function openDraw() {
    openElement("Draw");
}

function closeDraw() {
    closeElement("Draw");
}

// Initialize Fabric.js canvas and drawing functionalities
document.addEventListener('DOMContentLoaded', () => {
    const canvas = new fabric.Canvas('canvas');
    let isErasing = false;
    let history = [];
    let historyIndex = -1;

    const drawButton = document.getElementById('draw');
    const eraserButton = document.getElementById('eraser');
    const saveButton = document.getElementById('save');

    // Store the original button texts
    const drawButtonText = drawButton.innerHTML;
    const eraserButtonText = eraserButton.innerHTML;

    drawButton.addEventListener('click', function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            isErasing = false;
            eraserButton.innerHTML = eraserButtonText;
            canvas.freeDrawingBrush.color = document.getElementById('brush-color').value;
        }
    });

    eraserButton.addEventListener('click', function() {
        isErasing = !isErasing;
        if (isErasing) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = '#ffffff';  // Assuming white is the background color for erasing
        } else {
            canvas.freeDrawingBrush.color = document.getElementById('brush-color').value;
        }
    });

    document.getElementById('brush-color').addEventListener('input', (event) => {
        if (!isErasing) {
            canvas.freeDrawingBrush.color = event.target.value;
        }
    });

    document.getElementById('brush-width').addEventListener('input', (event) => {
        canvas.freeDrawingBrush.width = parseInt(event.target.value, 10);
    });

    // Set initial brush settings
    canvas.freeDrawingBrush.color = document.getElementById('brush-color').value;
    canvas.freeDrawingBrush.width = parseInt(document.getElementById('brush-width').value, 10);
    canvas.backgroundColor = '#fff';
    canvas.renderAll();

    function saveState() {
        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }
        history.push(canvas.toDatalessJSON());
        historyIndex++;
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            canvas.loadFromJSON(history[historyIndex], () => {
                canvas.renderAll();
            });
        }
    }

    // Save the initial state
    saveState();

    // Save state on object addition, modification, and removal
    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);

    window.addText = () => {
        const fontFamily = document.getElementById('fontDesign').style.fontFamily;
        const text = new fabric.IText('Tap and Type', {
            left: 100,
            top: 100,
            fontFamily: fontFamily,
            fill: '#333',
            fontSize: 20
        });
        canvas.add(text);
    };

    window.allowDrop = (ev) => {
        ev.preventDefault();
    };

    window.drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.src);
    };

    window.drop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        fabric.Image.fromURL(data, function(img) {
            img.scaleToWidth(200);
            canvas.add(img);
        });
    };

    // Save canvas as PNG
    saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Delete the selected object
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                saveState();
                canvas.renderAll();  // Ensure canvas is re-rendered
            }
        }

        // Handle undo (Ctrl+Z)
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();  // Prevent the default browser undo behavior
            undo();
        }
    }); 

    document.getElementById('imageLoader').addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = () => {
                const img = new fabric.Image(imgObj);
                img.scaleToWidth(200);
                canvas.add(img);
                canvas.renderAll();
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    canvas.on('object:selected', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'i-text') {
                console.log('Text selected:', activeObject.text);
            } else if (activeObject.type === 'image') {
                console.log('Image selected:', activeObject);
            }
        }
    });
});

const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");
let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");
let imageContainer = document.querySelector(".image-container");
let files = [];

button.onclick = () => {
    input.click();
};

// When browse
input.addEventListener("change", function () {
    Array.from(this.files).forEach(file => {
        files.push(file);
    });
    dropArea.classList.add("active");
    displayFiles();
});

// When file is inside drag area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload";
});

// When file leave the drag area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop";
});

// When file is dropped
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    Array.from(event.dataTransfer.files).forEach(file => {
        files.push(file);
    });
    displayFiles();
});

function displayFiles() {
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    imageContainer.innerHTML = ""; // Clear container before displaying new images

    files.forEach(file => {
        if (validExtensions.includes(file.type)) {
            let fileReader = new FileReader();

            fileReader.onload = () => {
                let fileURL = fileReader.result;
                let imgTag = `<img src="${fileURL}" alt="" style="width:100%; padding:20px 10px; float:left;">`;
                imageContainer.innerHTML += imgTag;
            };
            fileReader.readAsDataURL(file);
        } else {
            alert("This is not an Image File");
        }
    });

    dropArea.classList.remove("active"); // Reset drag area
    dragText.textContent = "Drag & Drop"; // Reset text
}


