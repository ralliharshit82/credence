"""Report dataset readiness; metrics require a sufficiently sized independent labeled CSV."""
import argparse,pandas as pd
p=argparse.ArgumentParser();p.add_argument('csv');a=p.parse_args();df=pd.read_csv(a.csv)
print({'rows':len(df),'labels':df['label'].value_counts().to_dict() if 'label' in df else {},'note':'No fabricated precision, recall, F1, or confusion matrix is produced.'})
