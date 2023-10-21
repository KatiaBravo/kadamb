// for both student answer and wolfram answer
import fs from "fs"
import { stringify } from "querystring";
// const student_latex = 'series_tester_incorrect.tex';
const student_latex = 'quadratics_simple_i.tex'; // Derivative/quadratics
// const wolfram_latex = 'series_tester_correct.tex';
const wolfram_latex = 'quadratics_simple_c.tex'; // Derivative/quadratics


// step 1: seperate lines into individual strings/objects (list)

async function splitLatexLines(latexPath) {
    console.log("latexPath", latexPath)
    var data = fs.readFileSync(latexPath, 'utf-8', (err, latexContent) => {});
    // console.log(data.split(`\\\\`))
    var split_data = data.split('\r\n    ');
    // split_data[0] = split_data.splice('\\\\');
    return split_data;
}
// WORKS

var student_pods = await splitLatexLines(student_latex);
var wolfram_pods = await splitLatexLines(wolfram_latex);
// console.log(student_pods, wolfram_pods)
// step 2: for each line, seperate the object into terms (list)

function splitLatexTerms(pods) { //TODO: this should be looping through all the lines
    // console.log("pre split latex: ", pods);
    var split_pods = pods.replace(/\\/g, '').replace('begin{alined}', '').replace('end{aligned}', '').replace('\\r\\n', '').split('+'); //not useful for non quadratic formulas
    // var split_equals = split_pods.split('=');
    // can also be if \\ is found along with {}
    console.log("split latex terms: ", split_pods);
    // check if terms are fully split, if not, split using another character 
    // remove any empty items in the array before returning
    return split_pods;
}

var student_broken = []
split_terms_in_lines(student_pods, student_broken);
var wolfram_broken = []
split_terms_in_lines(wolfram_pods, wolfram_broken);

function split_terms_in_lines(pods, broken) {
    pods.forEach(function(pod) {
        broken.push(splitLatexTerms(pod));
    });
}

var graded_work = []; // used to track term accuracy

// step 3: loop through items in wolfram, search the student answer for each term
function check_student_work(s_broken, w_broken, compared_terms) {
    w_broken.forEach(function(w_term) {
        console.log("Wolfram term: ", w_term);
        compared_terms.push(s_broken.map(function(s_term) { // WARNING: may not loop through the two sets of terms correctly
            // step 4: determine the accuracy of the answer
            if (w_term == s_term) { // best case scenario
                // TODO: right way to compare terms in latex?; seems to work for strings
                console.log("S-term: " + s_term)
                return s_term; // TODO: possible this doesn't work
            } else {
                console.log("Student term: ", s_term)
                return "flag";
            }
        }));
        console.log(w_term);
    });
}

check_student_work(student_broken, wolfram_broken, graded_work); // used to track term accuracy

// step 5: summarize accuracy by calculating each line's term accuracy
function accuracy_calculator(grades) {
    var total_accuracy = []
    grades.forEach(function(line_grade) {
        var flag_count = 0
        line_grade.forEach(function(term) {
            if (term == "flag") flag_count++;
        });
        var line_accuracy = flag_count/line_grade.length;
        total_accuracy.push(line_accuracy);
    });
    return total_accuracy;
}

var student_grade = accuracy_calculator(graded_work);

function print_grade(final_grade) {
    console.log(final_grade);
}

print_grade(student_grade);

// TODO: step 6: determine color coding


/* case #1: 
    - student answer -
    f(x) = 3x^2 + 8x + 7
    f'(x) = 6x + 8
    - wolfram answer -
    f(x)=3x^2+8x+7
    df/dx=6x+8
*/