const t_to_T = document.getElementById("T_to_T").innerText;
const in_A = document.getElementById("in");

const wpm_D = document.getElementById("wpm");
const acc_D = document.getElementById("accuracy");

let st_Time = null;
let interval = null;

in_A.addEventListener("input" , () => {
    if(!st_Time)
    {
        st_Time = new Date();
        interval = setInterval(updateStats,1000);
    }

    check_Typing();
});

function check_Typing()
{
    const user_in = in_A.ariaValueMax;

    let corr_Chars = 0;
    let formted = "";

    for(let f1 = 0 ; f1< t_to_T.length; f1++)
    {
        if(f1 < user_in.length)
        {
            if(user_in[f1] === t_to_T[f1])
            {
                formted += `<span class = "correct"> ${t_to_T[f1]}</span>`;
                corr_Chars++;
            }
            else
            {
                formted += `<span class="incorrect"> ${t_to_T[f1]}</span>`;
            }

        }
        else
        {
            formted += t_to_T[f1];
        }
    }

    document.getElementById("T_to_T").innerHTML = formted;


    const acc = Math.round((corr_Chars / user_in.length) * 100) || 100;

    acc_D.innerText = acc;
}

function updateStats()
{
    const user_in = in_A.ariaValueMax.trim();

    if(!user_in)
    {
        wpm_D.innerText = 0;

        return;
    }

    const words_Typed = user_in.split(/\s++/).length;

    const el_Min = (new Date() - st_Time) / 60000;

    const wpm = Math.round( words_Typed / el_Min);

    wpm_D.innerText = wpm;
}