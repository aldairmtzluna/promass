<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    private function notifyWebSocketServer(array $data): void
    {
        try {
            Http::post('http://localhost:3001/notify', [
                'event' => 'nuevo_usuario',
                'data' => [
                    'nombre' => $data['nombre'],
                    'email' => $data['email']
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error al notificar al servidor WebSocket: ' . $e->getMessage());
        }
    }

    public function index(): JsonResponse
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'data' => UserResource::collection($users)
        ]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = User::create($request->validated());
            
            // Notifica al servidor WebSocket
            $this->notifyWebSocketServer($user->toArray());
            
            return response()->json([
                'success' => true,
                'message' => 'Usuario creado exitosamente',
                'data' => new UserResource($user)
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}