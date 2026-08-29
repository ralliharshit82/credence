from typing import Any, Literal
from pydantic import BaseModel, Field, HttpUrl
class ScanRequest(BaseModel): url: HttpUrl
class Permissions(BaseModel):
    contacts: bool=False; sms: bool=False; call_logs: bool=False; storage: bool=False; gallery: bool=False; camera: bool=False; microphone: bool=False
class AppScanRequest(ScanRequest):
    permissions: Permissions=Field(default_factory=Permissions); stated_purpose: str='LOAN APPLICATION'
class Signal(BaseModel):
    name:str; severity:Literal['LOW','MEDIUM','HIGH']; score:float=Field(ge=0,le=1); explanation:str; evidence:dict[str,Any]={}
class ScanResponse(BaseModel):
    url:str; risk_level:Literal['LOWER_RISK','CAUTION','HIGH_RISK']; risk_score:int=Field(ge=0,le=100); evidence_strength:Literal['LOW','MEDIUM','HIGH']; identity:dict[str,Any]; signals:list[Signal]; categories:dict[str,Any]; recommendation:str; disclaimer:str
