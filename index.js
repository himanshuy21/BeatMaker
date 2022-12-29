class DrumKit{
    // constructor hai yeh bhai samjhe le classs wale cpp oops wale samjha ki nhi kauye
    constructor(){
        // select the audio sound and pads 
        this.pades = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.selects = document.querySelectorAll('select');
        this.currentkick = "./allsounds/kick-classic.wav";
        this.currentsnare = "./allsounds/snare-suckup.wav";
        this.currenthihat = "./allsounds/hihat-plain.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;// beats per minute 
        this.isPlaying = null;
        this.mutebtns = document.querySelectorAll(".mute");
        this.TempoSlider = document.querySelector(".tempo-slider");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over the padds
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.1s alternate ease-in-out 2`;
            // check if pads are active
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        // set an interval an loop over here 
        const interval = (30/this.bpm) * 1000;
        if(!this.isPlaying){
              this.isPlaying =  setInterval(() =>{
                this.repeat();
            } , interval)
            this.playBtn.innerText = "Stop";
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.playBtn.innerText = "Play";
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;    
            }
        }else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;    
            }
        }
    }
    changeTempo(e){
        const tempotext = document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempotext.innerText = e.target.value;
    }
    UpdateTempo(e){
        this.bpm = e.target.value;
         clearInterval(this.isPlaying);
         
         this.isPlaying = null;
         const playBtn = document.querySelector('.play');
         if(playBtn.classList.contains("active")){
            this.start();
         }
    }
}

const drumkit = new DrumKit();
// call the function of looping
// drumkit.start();
// all the event listeners are below 
drumkit.pades.forEach(pad => {
    pad.addEventListener("click",drumkit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    })
});
drumkit.playBtn.addEventListener('click' , () =>{
    drumkit.start();
})

drumkit.selects.forEach((select) => {
    select.addEventListener('change',function(e){
        drumkit.changeSound(e);
    })
});

drumkit.mutebtns.forEach(mute => {
    mute.addEventListener("click" ,function(e){
        drumkit.mute(e);
    })
})

drumkit.TempoSlider.addEventListener("input",function(e){
        drumkit.changeTempo(e);
})

drumkit.TempoSlider.addEventListener("change",function(e){
    drumkit.UpdateTempo(e);
})