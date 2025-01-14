import React, { useEffect, useRef, useState } from "react";

function SectionVideo() {
    const sectionRef = useRef(null);
    const playerRef = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [videoTime, setVideoTime] = useState(() => {
        const savedTime = localStorage.getItem('videoTime');
        return savedTime ? parseFloat(savedTime) : 0;
    });

    useEffect(() => {
        const saveVideoTime = () => {
            if (playerRef.current?.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                localStorage.setItem('videoTime', currentTime.toString());
                setVideoTime(currentTime);
            }
        };

        const interval = setInterval(saveVideoTime, 2000);
        window.addEventListener('beforeunload', saveVideoTime);

        return () => {
            clearInterval(interval);
            window.removeEventListener('beforeunload', saveVideoTime);
        };
    }, []);

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initializePlayer();
            } else {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = initializePlayer;
            }
        };

        if (!window.YT) {
            loadYouTubeAPI();
        } else {
            initializePlayer();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                // On ne fait plus rien quand la section devient visible
                // La vidéo ne démarre plus automatiquement
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isPlayerReady]);

    const initializePlayer = () => {
        if (!window.YT || !window.YT.Player) {
            console.error("YouTube Player API is not available");
            return;
        }

        playerRef.current = new window.YT.Player("video-player", {
            videoId: "_0YXkCN4yJw",
            events: {
                onReady: () => {
                    setIsPlayerReady(true);
                    if (videoTime > 0 && playerRef.current?.seekTo) {
                        playerRef.current.seekTo(videoTime, true);
                    }
                },
                onStateChange: (event) => {
                    if (event.data === window.YT.PlayerState.ENDED) {
                        if (playerRef.current?.seekTo) {
                            playerRef.current.seekTo(0);
                            localStorage.setItem('videoTime', '0');
                        }
                    }
                },
            },
            playerVars: {
                autoplay: 0,
                controls: 1,
                loop: 1,
                modestbranding: 1,
                rel: 0,
                start: Math.floor(videoTime),
                mute: 0,
            },
        });
    };

    return (
        <div
            ref={sectionRef}
            className="pt-[20px] pb-[10px] w-full"
        >
            <div className="relative w-full aspect-video"> 
                <div
                    id="video-player"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default SectionVideo;