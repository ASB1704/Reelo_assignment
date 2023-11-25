// document.querySelector(".btn-circle-download").addEventListener("click", function() {
//     var btnCircle = document.querySelector(".btn-circle-download");
    
//     btnCircle.classList.add("load");

//     setTimeout(function() {
//         btnCircle.classList.add("done");
//     }, 1000);

//     setTimeout(function() {
//         btnCircle.classList.remove("load", "done");
//     }, 5000);
// });

console.log('Script file loaded.');

function handleSubjectChange() {
    const subject = document.getElementById('subject').value;
    const topicContainer = document.getElementById('topicContainer');
    const topicDropdown = document.getElementById('topic');

    const topics = {
        Physics: ['Mechanics', 'Electromagnetism', 'Waves'],
        Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
        Biology: ['Anatomy', 'Biochemistry', 'Botany']
    };

    topicDropdown.innerHTML = '';
    topics[subject].forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicDropdown.appendChild(option);
    });

    topicContainer.style.display = subject === 'select' ? 'none' : 'flex';
}

function downloadQuestions() {
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const easyPercentage = document.getElementById('easyPercentage').value;
    const mediumPercentage = document.getElementById('mediumPercentage').value;
    const hardPercentage = document.getElementById('hardPercentage').value;
    const marksEasy = document.getElementById('marksEasy').value;
    const marksMedium = document.getElementById('marksMedium').value;
    const marksHard = document.getElementById('marksHard').value;
    const totalMarks = document.getElementById('totalMarks').value;

    const requestData = {
        subject,
        topic,
        easyPercentage,
        mediumPercentage,
        hardPercentage,
        marksEasy,
        marksMedium,
        marksHard,
        totalMarks
    };

    uri = 'https://question-generator-api.onrender.com/api/questions'
    // uri_dev = 'http://localhost:3000/api/questions'
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        displayQuestions(data);
        console.log('API response:', data);
    })
    .catch(error => {
        console.error('Error sending data to API:', error);
    });
}

function printDiv(divId) {
    var printContents = document.getElementById("question-div").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  function displayQuestions(questions) {
    const questionTable = document.getElementById('question-table');
    const questionWrp = document.getElementById('question-wrp');
  
    if (!questionTable || !questionWrp) {
      console.error('Error: Elements not found in the DOM');
      return;
    }
  
    questionTable.innerHTML = '';
  
    questions.forEach((question, index) => {
      const row = document.createElement('tr');
      const questionNumberCell = document.createElement('td');
      const questionContentCell = document.createElement('td');
  
      questionNumberCell.textContent = `Q${index + 1}`;
      questionContentCell.textContent = question.content;
  
      row.appendChild(questionNumberCell);
      row.appendChild(questionContentCell);
  
      questionTable.appendChild(row);
    });
  
    // Add the 'visible' class to make it visible
    questionWrp.classList.add('visible');
  }
  