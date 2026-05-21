import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConfig } from '../../config/app-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  selectedLanguageId: number = 1;
  isSound:boolean|undefined=true;
  isSpeakerOn:boolean|undefined=true;
  isParent:boolean|undefined =false; 
   @ViewChild('siriAudios') siriAudio!: ElementRef<HTMLAudioElement>;
  @ViewChild('siriVideos') siriVideo!: ElementRef<HTMLVideoElement>;
  constructor(private service: SharedService,private router: Router,appConfig: AppConfig,private route: ActivatedRoute
){
    this.BranchID = appConfig.branchID    
    // alert(this.BranchID);
    this.isSound=appConfig.isSound;
    
  }


  datePipe: DatePipe = new DatePipe('en-US');
  currentDate: Date = new Date();  
  Language:any;
  BranchID:any;
  Services:any;
  showLanguage = true;
  HomeServices: any[] =[];
  isConventional(): boolean {
    return this.HomeServices.some(service => service.ParentServiceName === 'Conventional');
  }
  isAlhuda(): boolean {
    return this.HomeServices.some(service => service.ParentServiceName === 'Coop Alhuda');
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    const paramValue = params['param'];
    if(paramValue==='app'){
      this.isSound=false;
      
    }
    if(sessionStorage.getItem('isSound') === 'false'){
      this.isSound=false;
    }
  });
    this.service.isparent.subscribe(isParent => {

      this.isParent=isParent;
      
    });
    this.service.isSpeakerOn.subscribe(isSpeakerOn => {

      this.isSpeakerOn=isSpeakerOn;
      
    });
    localStorage.setItem("BranchId", this.BranchID);
    //Set  default language English
    localStorage.setItem("LanguageId", "1");
    this.getLanguage();
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
    this.service.currentHomeServices.subscribe(HomeServices => {
      this.HomeServices = HomeServices;      
      if (this.HomeServices.length > 0) {}
    });
    this.playAudioAndAnimates();
  }

  playAudioAndAnimates(): void {
     if(this.isSound===true){
    this.speakText("Please Select Account Type.");
     }
  }

  speakText(text: string) {
    
    if(this.isSpeakerOn===true){
      if(this.isSound===true){
        const synth = window.speechSynthesis;
        const video: HTMLVideoElement = this.siriVideo.nativeElement;
        const speak = () => {
        const voices = synth.getVoices();
        const femaleVoice = voices.find(voice =>
        voice.name.toLowerCase().includes('zira') || // Windows
        voice.name.toLowerCase().includes('samantha') || // macOS
        voice.name.toLowerCase().includes('female') ||
        (voice.lang === 'en-US' && voice.name.toLowerCase().includes('google us english'))
      );
  
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = femaleVoice || voices[0];
      utterance.lang = 'en-US';
      utterance.rate = 1;
  
      // Start video when speech starts
      utterance.onstart = () => {
        video.play().catch(error => {
          console.error('Video play failed:', error);
        });
      };
  
      // Stop video when speech ends
      utterance.onend = () => {
        video.pause();
        video.currentTime = 0; // optional: reset to start
      };
  
      synth.speak(utterance);
    };
  
    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = () => speak();
    } else {
      speak();
    }
      }}
  }

  getLanguage(){
    var val = {};
    this.service.GetLanguage(val).subscribe(data => {     
      if(data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"]){
        this.Language = data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"];      
      }
    })
  }

  getServices(language:any){
    // 
    this.selectedLanguageId = language.LanguageID ;
    console.log("this.selectedlanguageid",this.selectedLanguageId);
    localStorage.setItem("LanguageId", language.LanguageID);    
    const currentUrl = this.router.url;

    this.playAudioAndAnimates();
  
     if(currentUrl == '/Home'){
      this.router.navigate(['/Homes']);
     }
     else{
      this.router.navigate(['/Home']);
     }
  }

  getChildServices(val:any){    
    this.service.GetChildServices(val).subscribe(data => {         
      if(data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"]){
        this.showLanguage = false;
        var Services = data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"];
        this.Services = this.modifyPropertyNames(Services);
      }
    })
  }

  modifyPropertyNames(data: any[]): any[] {
    return data.map((item) => {
      const newItem: { [key: string]: any } = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const newKey = key.replace('@', '');
          newItem[newKey] = item[key];
        }
      }
      return newItem;
    });
  }

  ParentBack(){  
     const currentUrl = this.router.url;
    
     if(currentUrl == '/Home'){
      this.router.navigate(['/Homes']);
     }
     else{
      this.router.navigate(['/Home']);
     }
  }
}
