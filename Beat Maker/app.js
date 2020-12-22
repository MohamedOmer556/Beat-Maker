class DrumKit{
    constructor(){
        this.playBtn = document.querySelector('.play');
        this.pads = document.querySelectorAll('.pad');
        this.currentKick = './sounds/kick-classic.wav';
        this.snareSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.volume');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePads(){
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar=>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains('active')){
                if (bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        if (!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    }
    else{
        clearInterval(this.isPlaying); 
        this.isPlaying = null;
    }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        }
        else{
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const selectName = e.target.name;
        const selectValue = e.target.value;
        switch(selectName){
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
        }
    }
    muteSound(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    updateTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    changeTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playBtn.classList.contains('active')){
            this.start();
        }
    }
}
const drumkit = new DrumKit();

drumkit.pads.forEach(pad=>{
    pad.addEventListener('click', drumkit.activePads);
    pad.addEventListener('animationend', ()=>{
        pad.style.animation = '';
    });
});

drumkit.playBtn.addEventListener('click', ()=>{
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach(select=>{
    select.addEventListener('change', (e)=>{
        drumkit.changeSound(e);
    });
});

drumkit.muteBtn.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        drumkit.muteSound(e);
    });
});

drumkit.tempoSlider.addEventListener('input', (e)=>{
    drumkit.updateTempo(e);
});
drumkit.tempoSlider.addEventListener('change', ()=>{
    drumkit.changeTempo();
});