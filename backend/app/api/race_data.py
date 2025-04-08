# backend/app/api/race_data.py
from fastapi import APIRouter, HTTPException
import fastf1
import pandas as pd
from typing import List, Dict, Any

router = APIRouter()

@router.get("/{race_name}")
async def get_race_data(race_name: str) -> List[Dict[str, Any]]:
    try:
        # Enable cache
        fastf1.Cache.enable_cache('cache')
        
        # Map race names to actual race data
        race_mapping = {
            "monaco": ("2023", "Monaco"),
            "silverstone": ("2023", "British"),
            "monza": ("2023", "Italian")
        }
        
        if race_name not in race_mapping:
            raise HTTPException(status_code=404, detail="Race not found")
            
        year, gp = race_mapping[race_name]
        
        # Load the race session
        session = fastf1.get_session(int(year), gp, 'R')
        session.load()
        
        # Get lap times for two drivers (example: VER and HAM)
        ver_laps = session.laps.pick_driver('VER')
        ham_laps = session.laps.pick_driver('HAM')
        
        # Process and format lap data
        lap_data = []
        for lap_num in range(1, min(len(ver_laps), len(ham_laps)) + 1):
            ver_lap = ver_laps.iloc[lap_num - 1] if lap_num <= len(ver_laps) else None
            ham_lap = ham_laps.iloc[lap_num - 1] if lap_num <= len(ham_laps) else None
            
            lap_data.append({
                "lap": lap_num,
                "driver1Time": ver_lap['LapTime'].total_seconds() if ver_lap is not None else None,
                "driver2Time": ham_lap['LapTime'].total_seconds() if ham_lap is not None else None
            })
        
        return lap_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
