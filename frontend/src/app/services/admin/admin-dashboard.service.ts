/*
 Copyright 2025 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AdminOverviewStats {
  totalUsers: number;
  totalWorkspaces: number;
  imagesGenerated: number;
  videosGenerated: number;
  audiosGenerated: number;
  totalMedia: number;
}

export interface AdminMediaOverTime {
  date: string;
  totalGenerated: number;
  images?: number;
  videos?: number;
  audios?: number;
}

export interface AdminWorkspaceStats {
  workspaceId: number;
  workspaceName: string | null;
  totalMedia: number;
  images: number;
  videos: number;
  audios: number;
}

export interface AdminActiveRole {
  role: string;
  count: number;
}

export interface AdminGenerationHealth {
  status: string;
  count: number;
}

export interface AdminMonthlyActiveUsers {
  month: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseUrl = '/api/v1/admin';

  constructor(private http: HttpClient) {}

  getOverviewStats(startDate?: string, endDate?: string): Observable<AdminOverviewStats> {
    const params = startDate && endDate ? `?start_date=${startDate}&end_date=${endDate}` : '';
    return this.http.get<any>(`${this.baseUrl}/overview-stats${params}`).pipe(
      map(data => ({
        totalUsers: data.total_users,
        totalWorkspaces: data.total_workspaces,
        imagesGenerated: data.images_generated,
        videosGenerated: data.videos_generated,
        audiosGenerated: data.audios_generated,
        totalMedia: data.total_media
      }))
    );
  }

  getMediaOverTime(startDate?: string, endDate?: string): Observable<AdminMediaOverTime[]> {
    const params = startDate && endDate ? `?start_date=${startDate}&end_date=${endDate}` : '';
    return this.http.get<any[]>(`${this.baseUrl}/media-over-time${params}`).pipe(
      map(items => items.map(item => ({
        date: item.date,
        totalGenerated: item.total_generated,
        images: item.images,
        videos: item.videos,
        audios: item.audios
      })))
    );
  }

  getWorkspaceStats(): Observable<AdminWorkspaceStats[]> {
    return this.http.get<any[]>(`${this.baseUrl}/workspace-stats`).pipe(
      map(items => items.map(item => ({
        workspaceId: item.workspace_id,
        workspaceName: item.workspace_name,
        totalMedia: item.total_media,
        images: item.images || 0,
        videos: item.videos || 0,
        audios: item.audios || 0
      })))
    );
  }

  getActiveRoles(): Observable<AdminActiveRole[]> {
    return this.http.get<AdminActiveRole[]>(`${this.baseUrl}/active-roles`);
  }

  getGenerationHealth(startDate?: string, endDate?: string): Observable<AdminGenerationHealth[]> {
    const params = startDate && endDate ? `?start_date=${startDate}&end_date=${endDate}` : '';
    return this.http.get<AdminGenerationHealth[]>(`${this.baseUrl}/generation-health${params}`);
  }

  getActiveUsersMonthly(): Observable<AdminMonthlyActiveUsers[]> {
    return this.http.get<AdminMonthlyActiveUsers[]>(`${this.baseUrl}/active-users-monthly`);
  }
}
